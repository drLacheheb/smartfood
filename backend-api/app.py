from waitress import serve
from flask import Flask, request, jsonify
from flask_cors import CORS
from actions.ai_model import AIModel
from actions.new_action import NewAction
from actions.response_model import ResponseModel
from datetime import datetime

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/meals/calculate', methods=['POST'])
def create_record():
    # Check if the request contains JSON data
    if not request.is_json:
        return jsonify({"error": "Request must be JSON"}), 400
    
    # Get date from JSON body
    data = request.get_json()
    date = data.get('date')
    
    if not date:
        return jsonify({"error": "Date is required"}), 400
    
    # Parse the date
    try:
        parsed_date = datetime.strptime(date, '%Y-%m-%d')
        day_of_week = int(parsed_date.strftime('%A')) # Full name of the day
        month = int(parsed_date.strftime('%B'))  # Full name of the month
    except ValueError:
        return jsonify({"error": "Invalid date format. Use YYYY-MM-DD"}), 400
    
    #lunch_counts, dinner_counts = AIModel.execute(day_of_week, month)
    lunch_counts, dinner_counts = NewAction.execute((day_of_week % 7), month)
    response = ResponseModel.execute(lunch_counts, dinner_counts)
        
    return jsonify(response)

if __name__ == '__main__':
    serve(app, host="0.0.0.0", port=5000)
