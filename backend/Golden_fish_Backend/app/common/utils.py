def create_message(message="", error=False, error_messages=[], data=[]):
    check = isinstance(data, list)
    check_error = isinstance(error_messages, list)
    if check == False:
        data = [data]
    if check_error == False:
        error_messages = [error_messages]
    return {"error": error, "message": message, "data": data, "error_messages": error_messages}


def error_handler(error):
    list_of_errors = []
    for key, values in error.items():
        list_of_errors.append(values[0])

    return list_of_errors
