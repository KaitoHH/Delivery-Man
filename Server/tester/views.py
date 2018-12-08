from django.http import JsonResponse


def get_data(request):
    data = {'key1': 'value1', 'key2': 'value2'}
    return JsonResponse(data)
