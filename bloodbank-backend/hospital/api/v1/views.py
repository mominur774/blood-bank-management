from rest_framework import generics
from hospital.api.v1.serializers import (
    HospitalSerializer, 
    BloodBankSerializer, 
    RecipientSerializer,
    DonorSerializer
)
from hospital.models import Hospital, BloodBank, Recipient, Donor
from rest_framework.permissions import AllowAny, IsAuthenticated

from django_filters import rest_framework as filters
from rest_framework.filters import OrderingFilter, SearchFilter


class HospitalListView(generics.ListAPIView):
    permission_classes = (AllowAny, )
    serializer_class = HospitalSerializer
    filter_backends = [
        SearchFilter, 
        OrderingFilter
    ]
    ordering_fields = ['name']
    search_fields = ['name', 'email', 'phone_number1', 'phone_number2']

    def get_queryset(self):
        return Hospital.objects.all().order_by('name')

class BloodBankListView(generics.ListAPIView):
    permission_classes = (IsAuthenticated, )
    serializer_class = BloodBankSerializer

    def get_queryset(self):
        return BloodBank.objects.filter(is_available=True).order_by('hospital')

class RecipientListCreateView(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticated, )
    serializer_class = RecipientSerializer
    filter_backends = [
        SearchFilter, 
        OrderingFilter
    ]
    ordering_fields = ['owner', 'blood_bank__hospital', 'created_at']
    search_fields = ['owner__username', 'blood_bank__hospital__name']

    def get_queryset(self):
        return Recipient.objects.all().order_by('-created_at')

class DonorListCreateView(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticated, )
    serializer_class = DonorSerializer
    filter_backends = [
        SearchFilter, 
        OrderingFilter
    ]
    ordering_fields = ['owner', 'hospital', 'created_at']
    search_fields = ['owner__username', 'hospital__name']
    
    def get_queryset(self):
        return Donor.objects.all().order_by('-created_at')