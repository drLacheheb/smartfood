import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
import xgboost as xgb
import lightgbm as lgb
from prophet import Prophet
from statsmodels.tsa.statespace.sarimax import SARIMAX
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense, Dropout
import matplotlib.pyplot as plt

class MealPredictionSystem:
    def __init__(self, data_path='meal_counts.csv'):
        self.data = pd.read_csv(data_path)
        self.data['date'] = pd.to_datetime(self.data['date'])
        self.scaler = StandardScaler()
        
    def prepare_features(self, target='lunch_meals'):
        """Prepare features for ML models."""
        features = [
            'bus_riders', 'bus_riders_1days_ago', 'bus_riders_2days_ago', 'bus_riders_3days_ago',
            'lunch_meals_1days_ago', 'lunch_meals_2days_ago', 'lunch_meals_3days_ago',
            'dinner_meals_1days_ago', 'dinner_meals_2days_ago', 'dinner_meals_3days_ago',
            'day_of_week', 'month'
        ]
        
        X = self.data[features]
        y = self.data[target]
        
        # Convert day_of_week to cyclical features
        X['day_sin'] = np.sin(2 * np.pi * X['day_of_week']/7)
        X['day_cos'] = np.cos(2 * np.pi * X['day_of_week']/7)
        
        # Convert month to cyclical features
        X['month_sin'] = np.sin(2 * np.pi * X['month']/12)
        X['month_cos'] = np.cos(2 * np.pi * X['month']/12)
        
        # Drop original day_of_week and month
        X = X.drop(['day_of_week', 'month'], axis=1)
        
        return X, y
    
    def train_xgboost(self, target='lunch_meals'):
        """Train XGBoost model."""
        X, y = self.prepare_features(target)
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
        
        model = xgb.XGBRegressor(
            n_estimators=100,
            learning_rate=0.1,
            max_depth=5,
            random_state=42
        )
        
        model.fit(X_train, y_train)
        
        # Make predictions
        y_pred = model.predict(X_test)
        
        # Calculate metrics
        metrics = {
            'mae': mean_absolute_error(y_test, y_pred),
            'rmse': np.sqrt(mean_squared_error(y_test, y_pred)),
            'r2': r2_score(y_test, y_pred)
        }
        
        return model, metrics
    
    def train_prophet(self, target='lunch_meals'):
        """Train Prophet model."""
        df_prophet = self.data[['date', target]].copy()
        df_prophet.columns = ['ds', 'y']
        
        # Add additional regressors
        df_prophet['bus_riders'] = self.data['bus_riders']
        
        model = Prophet(
            yearly_seasonality=True,
            weekly_seasonality=True,
            daily_seasonality=False
        )
        
        model.add_regressor('bus_riders')
        model.fit(df_prophet)
        
        # Make predictions for the test period
        future = model.make_future_dataframe(periods=30)
        future['bus_riders'] = df_prophet['bus_riders'].mean()  # Use mean for future predictions
        forecast = model.predict(future)
        
        return model, forecast
    
    def train_lstm(self, target='lunch_meals', sequence_length=7):
        """Train LSTM model."""
        X, y = self.prepare_features(target)
        
        # Scale the data
        X_scaled = self.scaler.fit_transform(X)
        
        # Create sequences
        X_seq, y_seq = [], []
        for i in range(len(X_scaled) - sequence_length):
            X_seq.append(X_scaled[i:(i + sequence_length)])
            y_seq.append(y.iloc[i + sequence_length])
        
        X_seq = np.array(X_seq)
        y_seq = np.array(y_seq)
        
        # Split the data
        train_size = int(len(X_seq) * 0.8)
        X_train = X_seq[:train_size]
        X_test = X_seq[train_size:]
        y_train = y_seq[:train_size]
        y_test = y_seq[train_size:]
        
        # Build LSTM model
        model = Sequential([
            LSTM(50, activation='relu', input_shape=(sequence_length, X.shape[1])),
            Dropout(0.2),
            Dense(25, activation='relu'),
            Dense(1)
        ])
        
        model.compile(optimizer='adam', loss='mse')
        
        # Train the model
        history = model.fit(
            X_train, y_train,
            epochs=50,
            batch_size=32,
            validation_split=0.1,
            verbose=0
        )
        
        # Make predictions
        y_pred = model.predict(X_test)
        
        # Calculate metrics
        metrics = {
            'mae': mean_absolute_error(y_test, y_pred),
            'rmse': np.sqrt(mean_squared_error(y_test, y_pred)),
            'r2': r2_score(y_test, y_pred)
        }
        
        return model, metrics, history
    
    def plot_predictions(self, true_values, predicted_values, title='Model Predictions'):
        """Plot true vs predicted values."""
        plt.figure(figsize=(12, 6))
        plt.plot(true_values, label='Actual')
        plt.plot(predicted_values, label='Predicted')
        plt.title(title)
        plt.xlabel('Time')
        plt.ylabel('Meals')
        plt.legend()
        plt.show()

if __name__ == '__main__':
    # Initialize the prediction system
    predictor = MealPredictionSystem()
    
    # Train and evaluate XGBoost
    print("Training XGBoost model...")
    xgb_model, xgb_metrics = predictor.train_xgboost(target='lunch_meals')
    print("XGBoost Metrics:", xgb_metrics)
    
    # Train and evaluate Prophet
    print("\nTraining Prophet model...")
    prophet_model, prophet_forecast = predictor.train_prophet(target='lunch_meals')
    
    # Train and evaluate LSTM
    print("\nTraining LSTM model...")
    lstm_model, lstm_metrics, lstm_history = predictor.train_lstm(target='lunch_meals')
    print("LSTM Metrics:", lstm_metrics)
