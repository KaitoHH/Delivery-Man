from django.http import Http404
from django.views.decorators.csrf import csrf_exempt
from tester.models import Tester
from tester.serializers import TesterMetaSerializer
from rest_framework.parsers import JSONParser
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status, generics
from rest_framework.views import APIView
from rest_framework.reverse import reverse
from rest_framework import viewsets


class TesterList(APIView):
    def get(self, request, format=None):
        testers = Tester.objects.all()
        tester = TesterMetaSerializer(testers, many=True)
        return Response(tester.data)

    def post(self, request, format=None):
        data = JSONParser().parse(request)
        tester = TesterMetaSerializer(data=data)
        if tester.is_valid():
            tester.save()
            return Response(tester.data, status=status.HTTP_201_CREATED)
        return Response(tester.errors, status=status.HTTP_400_BAD_REQUEST)


class TesterDetail(APIView):
    def get_object(self, pk):
        try:
            return Tester.objects.get(pk=pk)
        except Tester.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        tester = self.get_object(pk)
        serializer = TesterMetaSerializer(tester)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        tester = self.get_object(pk)
        data = JSONParser().parse(request)
        serializer = TesterMetaSerializer(tester, data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        tester = self.get_object(pk)
        tester.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class TesterViewList(generics.ListCreateAPIView):
    queryset = Tester.objects.all()
    serializer_class = TesterMetaSerializer


class TesterViewDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Tester.objects.all()
    serializer_class = TesterMetaSerializer


class TesterViewSet(viewsets.ModelViewSet):
    queryset = Tester.objects.all()
    serializer_class = TesterMetaSerializer


@api_view(['GET'])
def api_root(request, format=None):
    return Response({
        'tester': reverse('tester-list', request=request, format=format)
    })
