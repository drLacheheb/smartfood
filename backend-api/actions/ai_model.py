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
            
            # Prepare input features
            
            # Convert day and month to numerical indices
            day_num = day_of_week % 7
            
            # Create cyclical features for day and month
            day_sin = np.sin(2 * np.pi * day_num / 7)
            day_cos = np.cos(2 * np.pi * day_num / 7)
            month_sin = np.sin(2 * np.pi * month / 12)
            month_cos = np.cos(2 * np.pi * month / 12)
            
            # Create feature vector with placeholders
            features = [
                # Placeholder for bus_riders (current day)
                0,  
                # Placeholder for bus_riders historical data
                0, 0, 0,  
                # Placeholder for lunch meals historical data
                0, 0, 0,  
                # Placeholder for dinner meals historical data
                0, 0, 0,  
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