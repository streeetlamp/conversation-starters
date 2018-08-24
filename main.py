# import libraries
import urllib3
from bs4 import BeautifulSoup
import requests
from datetime import datetime

page = requests.get('https://conversationstartersworld.com/250-conversation-starters/')

soup = BeautifulSoup(page.text, 'html.parser')
price = soup.find("div", class_="entry-content").find("p", class_=None).text

with open('/Users/whitbycw/Desktop/conversation-starters/conversation-starters.csv', 'a') as cool_csv:
    print_statement = str(datetime.now()) + ", " + price + "\n"
    # cool_csv.write(print_statement)
    print(print_statement)

