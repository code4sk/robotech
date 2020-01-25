import xml.etree.ElementTree as ET
import requests
import urllib
import time
from bs4 import BeautifulSoup

url = "https://www.cnbc.com/2019/07/31/energy-secretary-rick-perry-humans-play-a-role-in-climate-change.html"
response = requests.get(url)
# root = ET.fromstring(response.text)
# for child in root.iter():
#     print(child.tag, child.attrib, child.text)
print(response.text)
