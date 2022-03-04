#CREADO y EDITADO POR: KUROI OF APOFIS

import time
import math
import random
import os
from time import sleep
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.common.alert import Alert
browser = webdriver.Chrome('./chromedriverLinux')
sleep(random.uniform(0.8,1.0))
browser.set_window_size(1000, 900)
sleep(random.uniform(1.0,2.0))
browser.get('http://192.168.0.1')
sleep(random.uniform(8.0,10.0))
user = browser.find_element_by_xpath('//input[@id="UserName"]')
sleep(random.uniform(0.5,1.0))
user.click()
sleep(random.uniform(0.5,1.0))
user.send_keys('admin')
sleep(random.uniform(1,3))
passw = browser.find_element_by_xpath('//input[@id="Password"]')
sleep(random.uniform(0.5,1.0))
passw.click()
sleep(random.uniform(0.5,1.0))
passw.send_keys('password')
sleep(random.uniform(1,3))
entrar = browser.find_element_by_xpath('//input[@class="submitBtn"]')
sleep(random.uniform(0.5,1.0))
entrar.click()
sleep(random.uniform(10.0,12.0))
sleep(random.uniform(0.5,1.0))
browser.get('http://192.168.0.1/router.html?wifi_mac')
sleep(random.uniform(5.0,7.0))
select = browser.find_element_by_xpath('//*[@id="MACAddressFilterTable"]/tbody/tr[1]/td[1]/input')
sleep(random.uniform(0.5,1.0))
select.click()
sleep(1)
eliminar = browser.find_element_by_xpath('//input[@id="Mac_Delete"]')
sleep(random.uniform(0.5,1.0))
eliminar.click()
sleep(random.uniform(1,2))
driver.close()
sleep(random.uniform(0.5,1.0))