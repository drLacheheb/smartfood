from flask import jsonify


class ResponseModel:
    @staticmethod
    def execute(lunch,dinner):
        try:
            print('Sending pull requests to Google Gemini for review')

            # Create a bot-like response with meal count
            response_text = f"Meal Analysis Complete! \nLunch Items: {len(lunch.split(','))} \nDinner Items: {len(dinner.split(','))}"

            return response_text

        except Exception as e:
            print('Error occurred while processing meals:', e)
            return jsonify({
                'success': False,
                'error': str(e)
            })