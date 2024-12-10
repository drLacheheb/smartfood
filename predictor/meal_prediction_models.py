import os
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
import xgboost as xgb
import matplotlib.pyplot as plt
import pickle

class MealPredictionSystem:
    def __init__(self, data_path='sources/meal_counts.csv'):
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
    
    def train_xgboost(self, target='lunch_meals', is_load=False):
        """Train XGBoost model."""
        X, y = self.prepare_features(target)
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
        model = None
        
        if is_load and os.path.isfile(f'models/{target}_xg.pkl'):
            model = pickle.load(f'models/{target}_xg.pkl')
        else:
            model = xgb.XGBRegressor(
                n_estimators=100,
                learning_rate=0.1,
                max_depth=5,
                random_state=42
            )
        
        model.fit(X_train, y_train)
        pickle.dump(model, open(f'models/{target}_xg.pkl', 'wb'))
        
        # Make predictions
        y_pred = model.predict(X_test)
        
        # Calculate metrics
        metrics = {
            'mae': mean_absolute_error(y_test, y_pred),
            'rmse': np.sqrt(mean_squared_error(y_test, y_pred)),
            'r2': r2_score(y_test, y_pred)
        }
        
        return model, metrics
        
        
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

    print("Train completed")
