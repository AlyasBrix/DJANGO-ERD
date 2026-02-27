from django.urls import path
from .views import EmployeeListCreateView, DepartmentListCreateView, ProjectListCreateView

urlpatterns = [
    path('employees/', EmployeeListCreateView.as_view(), name='employees'),
    path('departments/', DepartmentListCreateView.as_view(), name='departments'),
    path('projects/', ProjectListCreateView.as_view(), name='projects'),
]
