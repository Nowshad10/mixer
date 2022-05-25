from django.urls import path
from .views import DrinkList, SingleDrink
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path('<str:username>/', DrinkList.as_view()),
    path('single/<int:id>/', SingleDrink.as_view())
]

urlpatterns = format_suffix_patterns(urlpatterns)
