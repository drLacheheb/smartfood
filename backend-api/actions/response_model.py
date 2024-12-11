from flask import jsonify

class ResponseModel:
    @staticmethod
    def execute(lunch, dinner):
        try:
            # Return simple lunch and dinner values
            response = {
                "lunch": lunch,
                "dinner": dinner
            }
            
            return response

        except Exception as e:
            return {
                "lunch": "خطأ",
                "dinner": "خطأ"
            }