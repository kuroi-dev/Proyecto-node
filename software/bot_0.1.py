#CREADO y EDITADO POR: KUROI-DEV OF APOFIS

import time
import math
import random
import os
import pymysql
from time import sleep
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.common.alert import Alert

# Conectar con mysql

connection = pymysql.connect(
    host="localhost",
    user="root",
    password="",
    db="login_apofis"
)

#  Abrir navegador 


driver = webdriver.Chrome('./chromedriver')

inicio = time.time()

driver.get("https://lider.cl/")
try:
	element = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.ID, "prehomegr_card_icono_supermercado")))
	driver.get("https://www.lider.cl/supermercado/")
	element2 = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.ID, "bannerCarousel")))
	driver.get("https://www.lider.cl/supermercado/category/Campanas/Volvamos-con-Todo/Art%C3%ADculos-de-Oficina/Papel-Fotocopia/_/N-16bfe23")
	element3 = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.ID, "content-prod-boxes")))
	sleep(random.uniform(1.0,2.0))

	boton1 = driver.find_element_by_xpath('//button[@class="btn btn-info btn-block btn-agregar js-btn-agregar"]')
	sleep(random.uniform(1.0,2.0))
	boton1.click()
	sleep(random.uniform(1.0,2.0))

	boton2 = driver.find_element_by_xpath('//button[@title="SELECCIONA REGIÓN:"]')
	sleep(random.uniform(1.0,2.0))
	boton2.click()
	sleep(random.uniform(1.0,2.0))

	rm = driver.find_element_by_xpath('//*[@id="regions-hasDelivery"]/div/div/ul/li[2]/a')
	sleep(random.uniform(1.0,2.0))
	rm.click()
	sleep(random.uniform(1.0,2.0))

	boton3 = driver.find_element_by_xpath('//button[@title="Selecciona Comuna:"]')
	sleep(random.uniform(1.0,2.0))
	boton3.click()
	sleep(random.uniform(1.0,2.0))

	comuna = driver.find_element_by_xpath('//*[@id="communes-hasDelivery"]/div/div/ul/li[60]/a')
	sleep(random.uniform(1.0,2.0))
	comuna.click()
	sleep(random.uniform(1.0,2.0))

	confirmar = driver.find_element_by_xpath('//*[@id="btn-shipping-service-delivery"]')
	sleep(random.uniform(1.0,2.0))
	confirmar.click()
	sleep(random.uniform(1.0,2.0))
	
	element4 = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.ID, "quickCartNewBox")))
	sleep(random.uniform(1.0,2.0))

	box = driver.find_element_by_xpath('//*[@id="quickCartNewBox"]')
	sleep(random.uniform(1.0,2.0))
	box.click()
	sleep(random.uniform(1.0,2.0))

    
finally:
	print("Timed out waiting for page to load")

driver.quit()
fin = time.time()
print(fin-inicio)