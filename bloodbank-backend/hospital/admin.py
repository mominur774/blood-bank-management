from django.contrib import admin
from hospital.models import Hospital, BloodBank, Recipient, Donor


# Register your models here.


@admin.register(Hospital)
class HospitalAdmin(admin.ModelAdmin):
    list_display = ('name', 'address', 'phone_number1',)

@admin.register(BloodBank)
class BloodBankAdmin(admin.ModelAdmin):
    list_display = ('hospital', 'blood_group', 'bag_quantity', )

@admin.register(Recipient)
class RecipientAdmin(admin.ModelAdmin):
    list_display = ('blood_bank', 'owner','bag_quantity', )

@admin.register(Donor)
class DonorAdmin(admin.ModelAdmin):
    list_display = ('owner', 'hospital', 'bag_quantity', )