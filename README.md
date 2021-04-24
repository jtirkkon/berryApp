# berryApp

Sovellus on tarkoitettu marjapaikan tai muun, esim. kalapaikan, tallennukseen. Perusnäkymässä on kartta ja sovelluksen käynnistyessä kartta näyttää käyttäjän sijainnin. 
Alareunassa olevasta painikkeesta käyttäjä voi myöhemmin paikallistaa oman sijaintinsa. Jos käyttäjä valitsee ylävalikosta Save, niin koordinaatit tallennetaan 
käyttäjän sijainnin perusteella. Näytön alareunassa olevasta painikkeesta voi myös valita toiminnon, jossa tallennettavan paikan koordinaatit valitaan klikkaamalla 
karttaa halutusta kohdasta. 

Kun käyttäjä on valinnut tallennettavan paikan, niin sovellus siirtyy tallennusnäkymään, jossa käyttäjä syöttää marjan, paikan nimen, litramäärän, päivämäärän ja 
muistion. Jos marjavalikosta valitaan other, avautuu uusi ikkuna, johon syötetään haluttu tieto. Save painikkeesta tallennetaan tiedot tietokantaan.

Show places valinta näyttää tallennetut paikat. i-ikonia klikkaamalla näytetään kaikki tiedot paikasta, roskakori kuvakkeesta poistetaan paikka. Kun paikkaa painetaan, 
niin sovellus siirtyy kartta näkymään näyttäen paikan. Markkeria klikkaamalla saa näkyviin marjan, paikan nimen ja päivämäärän. Käyttäjä voi valita monta paikkaa 
painamalla pidempään paikkaa, jolloin i-ikonin väri muuttuu tumman vihreäksi ja valinta poistetaan uudella pitkällä painalluksella. Kun halutut paikat on valittu, 
niin Show selected näyttää valitut paikat kartalla, sovellus navigoi listalla ensimmäisenä olevaan paikkaan.


Tietokantana käytetään Googlen firebase tietokantaa.

Käytettyjä kirjastoja:

- React navigation
- React native elements
- Firebase
- React native maps
- Expo location
- React native picker
