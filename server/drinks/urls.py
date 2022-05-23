from django.urls import path
from .views import DrinkList
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path('<str:username>/', DrinkList.as_view())
]

urlpatterns = format_suffix_patterns(urlpatterns)
