from django.urls import path
from hospital.api.v1 import views

urlpatterns = [
    path('hospital-list/', views.HospitalListView.as_view(), name='hospital-list'),
    path('blood-bank/', views.BloodBankListView.as_view(), name='blood-bank'),
    path('recipient/', views.RecipientListCreateView.as_view(), name='recipient'),
    path('donor/', views.DonorListCreateView.as_view(), name='donor'),
]
