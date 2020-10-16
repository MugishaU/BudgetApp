from functools import wraps


def format_resp(resultproxy):
    d, a = {}, []
    for rowproxy in resultproxy:
        for column, value in rowproxy.items():
            d = {**d, **{column: value}}
        a.append(d)
    return a