import os
import pickle
import numpy as np
import pandas as pd

class AIModel:
    @staticmethod
    def execute(day_of_week, month):
        try:
            # Define paths to pickle models
            base_path = os.path.dirname(os.path.abspath(__file__))
            lunch_model_path = os.path.join(base_path, 'models', 'lunch_meals_xg.pkl')
            dinner_model_path = os.path.join(base_path, 'models', 'dinner_meals_xg.pkl')
            
            # Load models
            with open(lunch_model_path, 'rb') as lunch_file:
                lunch_model = pickle.load(lunch_file)
            
            with open(dinner_model_path, 'rb') as dinner_file:
                dinner_model = pickle.load(dinner_file)
            
            # Load meal counts data
            data_path = os.path.join(base_path, 'meal_counts.csv')
            df = pd.read_csv(data_path)
            
            # Calculate averages
            bus_riders_avg = df['bus_riders'].mean()
            bus_riders_hist_avg = df[['bus_riders_1days_ago', 'bus_riders_2days_ago', 'bus_riders_3days_ago']].mean().mean()
            
            lunch_meals_hist_avg = df[['lunch_meals_1days_ago', 'lunch_meals_2days_ago', 'lunch_meals_3days_ago']].mean().mean()
            dinner_meals_hist_avg = df[['dinner_meals_1days_ago', 'dinner_meals_2days_ago', 'dinner_meals_3days_ago']].mean().mean()
            
            # Create cyclical features for day and month
            day_sin = np.sin(2 * np.pi * day_of_week / 7)
            day_cos = np.cos(2 * np.pi * day_of_week / 7)
            month_sin = np.sin(2 * np.pi * month / 12)
            month_cos = np.cos(2 * np.pi * month / 12)
            
            # Create feature vector with average values
            features = [
                # Bus riders (current day) average
                bus_riders_avg,  
                # Bus riders historical data average
                bus_riders_hist_avg, bus_riders_hist_avg, bus_riders_hist_avg,  
                # Lunch meals historical data average
                lunch_meals_hist_avg, lunch_meals_hist_avg, lunch_meals_hist_avg,  
                # Dinner meals historical data average
                dinner_meals_hist_avg, dinner_meals_hist_avg, dinner_meals_hist_avg,  
                # Day and month cyclical features
                day_sin, day_cos,
                month_sin, month_cos
            ]
            
            # Convert to numpy array and reshape
            input_data = np.array(features).reshape(1, -1)
            
            # Generate predictions
            lunch_prediction = lunch_model.predict(input_data)
            dinner_prediction = dinner_model.predict(input_data)
            
            return lunch_prediction, dinner_prediction
        
        except Exception as e:
            print(f'Error in AI Model execution: {e}')
            # Return default or error values
            return '0', '0'