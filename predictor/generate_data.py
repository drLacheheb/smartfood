import os
import pandas as pd
import numpy as np
from datetime import datetime, timedelta

# Set random seed for reproducibility
# np.random.seed(42)

def is_holiday(date):
    """Check if a date is a holiday."""
    holidays = [
        '2023-01-01',  # New Year's Day
        '2023-05-01',  # Labor Day
        '2023-07-05',  # Independence Day
        '2023-07-08',  # Eid al-Adha (approximate)
        '2023-07-09',  # Eid al-Adha (approximate)
        '2023-07-19',  # Islamic New Year (approximate)
        '2023-09-27',  # Prophet's Birthday (approximate)
        '2023-11-01',  # Revolution Day
        '2023-12-11',  # Eid al-Fitr (approximate)
        '2023-12-12'   # Eid al-Fitr (approximate)
    ]
    return date.strftime('%Y-%m-%d') in holidays

def generate_weather_impact(dates):
    """Generate weather impact factors (-1 to 1, where -1 is severe weather)."""
    month_weights = {
        1: -0.3, 2: -0.3, 3: -0.1,  # Winter months
        4: 0, 5: 0.1, 6: 0.2,      # Spring
        7: 0.2, 8: 0.2, 9: 0.1,    # Summer
        10: 0, 11: -0.1, 12: -0.2  # Fall/Winter
    }
    
    weather_impacts = []
    for date in dates:
        base_impact = month_weights[date.month]
        daily_variation = np.random.normal(0, 0.2)
        weather_impacts.append(base_impact + daily_variation)
    
    return np.array(weather_impacts)

def generate_resident_count(total_students):
    """Generate number of resident students (approximately 30% of total)."""
    resident_ratio = np.random.normal(0.30, 0.02)  # 30% with small variation
    return int(total_students * resident_ratio)

def generate_day_of_week_pattern(dates):
    """Generate day-of-week patterns."""
    dow_effects = {
        5: 0.0,     # Friday (no school)
        6: 1.0,     # Saturday (start of week)
        0: 0.98,    # Sunday
        1: 0.97,    # Monday
        2: 0.95,    # Tuesday
        3: 0.94,    # Wednesday
        4: 0.92     # Thursday (end of week)
    }
    return np.array([dow_effects[date.dayofweek] for date in dates])

def generate_dates(start_date, end_date):
    """Generate a list of dates excluding Fridays and holidays."""
    dates = pd.date_range(start=start_date, end=end_date)
    return dates[(dates.dayofweek != 5) & (~dates.map(is_holiday))]

def generate_bus_data(dates):
    """Generate synthetic bus ridership data with realistic patterns."""
    n_days = len(dates)
    
    # Base number of students (mean around 800)
    base_students = np.random.normal(800, 50, n_days)
    
    # Add seasonal variation
    seasonal_effect = 50 * np.sin(2 * np.pi * np.arange(n_days) / 365)
    
    # Generate various impact factors
    weather_impact = generate_weather_impact(dates)
    dow_pattern = generate_day_of_week_pattern(dates)
    
    # Apply all effects
    total_students = (base_students + 
                     seasonal_effect + 
                     weather_impact * 50)
    
    # Apply day of week pattern
    total_students = total_students * dow_pattern
    
    # Add random daily variation
    daily_variation = np.random.normal(0, 15, n_days)
    total_students += daily_variation
    
    # Ensure positive numbers and round to integers
    total_students = np.maximum(total_students, 0)
    total_students = np.round(total_students).astype(int)
    
    return total_students

def generate_meal_counts(bus_counts, dates):
    """Generate separate lunch and dinner meal counts."""
    # Lunch participation rates by day of week
    lunch_ratios = {
        6: 0.88,    # Saturday (start of week)
        0: 0.87,    # Sunday
        1: 0.86,    # Monday
        2: 0.85,    # Tuesday
        3: 0.84,    # Wednesday
        4: 0.82     # Thursday
    }
    
    # Dinner participation rates for residents by day of week
    # Lower on weekends as some residents might go home
    dinner_ratios = {
        6: 0.70,    # Saturday (lower, some go home)
        0: 0.75,    # Sunday (some return)
        1: 0.85,    # Monday
        2: 0.85,    # Tuesday
        3: 0.83,    # Wednesday
        4: 0.75     # Thursday (some leave early)
    }
    
    lunch_counts = []
    dinner_counts = []
    resident_counts = []
    
    for i, (count, date) in enumerate(zip(bus_counts, dates)):
        # Calculate number of resident students (30% of total)
        resident_count = generate_resident_count(count)
        resident_counts.append(resident_count)
        
        # Calculate lunch count
        base_lunch_ratio = lunch_ratios[date.dayofweek]
        lunch_ratio = np.random.normal(base_lunch_ratio, 0.03)
        lunch_count = int(count * lunch_ratio)
        
        # Special meal days affect lunch participation
        if np.random.random() < 0.1:  # 10% chance of special meal day
            lunch_count = int(lunch_count * np.random.uniform(1.05, 1.15))
        
        # Calculate dinner count (only for residents)
        base_dinner_ratio = dinner_ratios[date.dayofweek]
        dinner_ratio = np.random.normal(base_dinner_ratio, 0.05)
        dinner_count = int(resident_count * dinner_ratio)
        
        # Weather affects dinner more than lunch (students might prefer to eat in their dorms)
        if np.random.random() < 0.2:  # 20% chance of weather impact on dinner
            dinner_count = int(dinner_count * np.random.uniform(0.9, 1.1))
        
        lunch_counts.append(lunch_count)
        dinner_counts.append(dinner_count)
    
    return np.array(lunch_counts), np.array(dinner_counts), np.array(resident_counts)

# Generate one year of data
start_date = '2023-01-01'
end_date = '2023-12-31'

# Generate dates (excluding Fridays)
dates = generate_dates(start_date, end_date)

# Generate bus ridership data
bus_counts = generate_bus_data(dates)

# if folder 'sources' doesn't exist, create it
if not os.path.exists('predictor/sources'):
    os.makedirs('predictor/sources')

for period in ['lunch', 'dinner']:
    if period == 'dinner':
        bus_counts = bus_counts // 5
    # Generate meal counts
    lunch_counts, dinner_counts, resident_counts = generate_meal_counts(bus_counts, dates)

    # Create initial DataFrame
    meals_df = pd.DataFrame({
        'date': dates,
        'day_of_week': dates.dayofweek,
        'month': dates.month,
        'bus_riders': bus_counts,
        'resident_students': resident_counts,
        'lunch_meals': lunch_counts,
        'dinner_meals': dinner_counts
    })

    # Add historical data for previous 3 days
    for i in range(1, 4):
        # Shift bus riders
        meals_df[f'bus_riders_{i}days_ago'] = meals_df['bus_riders'].shift(i)
        # Shift lunch meals
        meals_df[f'lunch_meals_{i}days_ago'] = meals_df['lunch_meals'].shift(i)
        # Shift dinner meals
        meals_df[f'dinner_meals_{i}days_ago'] = meals_df['dinner_meals'].shift(i)

    # Fill NaN values for the first 3 days with the mean values
    for i in range(1, 4):
        meals_df[f'bus_riders_{i}days_ago'].fillna(meals_df['bus_riders'].mean(), inplace=True)
        meals_df[f'lunch_meals_{i}days_ago'].fillna(meals_df['lunch_meals'].mean(), inplace=True)
        meals_df[f'dinner_meals_{i}days_ago'].fillna(meals_df['dinner_meals'].mean(), inplace=True)

    # Save to CSV file
    meals_df.to_csv(f'predictor/sources/{period}_meal_counts.csv', index=False)
