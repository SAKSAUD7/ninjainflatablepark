import urllib.request
import json
import ssl

def check_settings():
    try:
        # Ignore SSL context for localhost
        ctx = ssl.create_default_context()
        ctx.check_hostname = False
        ctx.verify_mode = ssl.CERT_NONE

        url = 'http://localhost:8000/api/v1/core/settings/'
        req = urllib.request.Request(url)
        
        with urllib.request.urlopen(req, context=ctx) as response:
            status = response.getcode()
            print(f"Status Code: {status}")
            
            if status == 200:
                data = json.loads(response.read().decode('utf-8'))
                print("Response JSON received (truncated):")
                print(str(data)[:200] + "...")
                
                if isinstance(data, list) and len(data) > 0:
                    park_name = data[0].get('park_name')
                    print(f"Park Name: {park_name}")
                    if park_name == "Ninja Inflatable Park":
                        print("SUCCESS: Settings API returning correct default data.")
                    else:
                        print(f"WARNING: Unexpected park name: {park_name}")
                else:
                    print("WARNING: unexpected data format or content.")
            else:
                print("FAILURE: API returned non-200 status.")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    check_settings()
