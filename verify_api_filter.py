import os
import django
import sys
from django.test import RequestFactory

# Setup Django environment
sys.path.append(os.path.join(os.path.dirname(__file__), 'backend'))
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "ninja_backend.settings")
django.setup()

from apps.cms.views import PageSectionViewSet
from apps.cms.models import PageSection

def verify_api_filtering():
    print("Verifying API Filtering Logic...")
    
    # Create factory
    factory = RequestFactory()
    view = PageSectionViewSet.as_view({'get': 'list'})
    
    # Test 1: Query for 'home'
    print("\n--- Test 1: Fetching ?page=home ---")
    request = factory.get('/api/cms/page-sections/?page=home')
    response = view(request)
    
    if hasattr(response, 'data'):
        # For list view with pagination, results might be in 'results' or direct list
        # DRF generic view usually paginates
        # But we are calling as_view directly without full middleware stack might behave differently
        # Let's inspect queryset directly from view instance method logic
        
        # Testing logic directly is safer:
        view_instance = PageSectionViewSet()
        view_instance.request = request
        view_instance.format_kwarg = None
        # Mock query params since RequestFactory doesn't automatically parse them into request.query_params for direct view access in this context
        # DRF views normally handle this parsing. We need to manually set it for our direct call test.
        from django.http import QueryDict
        view_instance.request.query_params = QueryDict('page=home')
        
        qs = view_instance.get_queryset()
        
        print(f"Count: {qs.count()}")
        for item in qs:
            print(f"- ID: {item.id} | Page: {item.page}")
            if item.page != 'home':
                print("❌ FAIL: Retrieved non-home item!")
            else:
                print("✅ PASS: Item is home")
    
    # Test 2: Query for 'attractions'
    print("\n--- Test 2: Fetching ?page=attractions ---")
    request_attr = factory.get('/api/cms/page-sections/?page=attractions')
    view_instance_attr = PageSectionViewSet()
    view_instance_attr.request = request_attr
    view_instance_attr.request.query_params = QueryDict('page=attractions')
    qs_attr = view_instance_attr.get_queryset()
    
    print(f"Count: {qs_attr.count()}")
    for item in qs_attr:
        print(f"- ID: {item.id} | Page: {item.page}")
        if item.page != 'attractions':
            print("❌ FAIL: Retrieved non-attractions item!")
        else:
            print("✅ PASS: Item is attractions")

    # Test 3: No filter (Should return all)
    print("\n--- Test 3: Fetching All (No filter) ---")
    request_all = factory.get('/api/cms/page-sections/')
    view_instance_all = PageSectionViewSet()
    view_instance_all.request = request_all
    view_instance_all.request.query_params = QueryDict('')
    qs_all = view_instance_all.get_queryset()
    print(f"Total Count: {qs_all.count()}")
    if qs_all.count() >= 2:
        print("✅ PASS: Returning multiple pages when no filter provided")

if __name__ == "__main__":
    verify_api_filtering()
