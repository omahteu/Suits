from requests import delete

for c in range(350, 555):
    delete(f'https://startech.pythonanywhere.com/cofre/{c}')
