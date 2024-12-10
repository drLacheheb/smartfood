from flask import Flask, request
from actions.ai_model import AIModel
from actions.response_model import ResponseModel
from datetime import datetime

app = Flask(__name__)

@app.route('/meals/calculate', methods=['POST'])
def create_record():
    date = str(request.args.get('date'))
    
    # Parse the date
    try:
        parsed_date = datetime.strptime(date, '%Y-%m-%d')
        day_of_week = parsed_date.strftime('%A')  # Full name of the day
        month = parsed_date.strftime('%B')  # Full name of the month
    except ValueError:
        day_of_week = 'Invalid Date'
        month = 'Invalid Date'
    
    lunch_counts, dinner_counts = AIModel.execute(day_of_week, month)
    response = ResponseModel.execute(lunch_counts,dinner_counts)
        
    return response

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
