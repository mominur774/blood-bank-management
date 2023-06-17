from django.utils.translation import gettext_lazy as _
from django.db import models

class BLOOD_GROUP(models.TextChoices): 
    O_POSITIVE ='O+', _('O+'),
    A_POSITIVE ='A+', _('A+'),
    B_POSITIVE ='B+', _('B+'),
    AB_POSITIVE ='AB+', _('AB+'),
    O_NEGATIVE ='O-', _('O-'),
    A_NEGATIVE ='A-', _('A-'),
    B_NEGATIVE ='B-', _('B-'),
    AB_NEGATIVE ='AB-', _('AB-'),


class HOSPITAL_TYPE(models.TextChoices):
    GOVERNMENT = 'GOVERNMENT', _('Government'),
    PRIVATE = 'PRIVATE', _('Private')