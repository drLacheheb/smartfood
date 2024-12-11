import os
import pandas as pd

class NewAction:
    
    def execute(self, day_of_week, month):
        
        base_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', 'predictor', 'sources'))
        self.lunch_data = pd.read_csv(os.path.join(base_path, 'meal_counts.csv'))
        
        prediction = self.lunch_data[
            (self.lunch_data['day_of_week'] == day_of_week) & 
            (self.lunch_data['month'] == month)
        ]
        
        return int(round(prediction['lunch_meals'])), int(round(prediction['dinner_meals']))
