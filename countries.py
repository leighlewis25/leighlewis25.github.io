four_letter_countries = ["chad", "cuba", "greenland", "iraq", "mali", "oman", "india"]

four_letter_countries.append('fiji')
four_letter_countries.insert(four_letter_countries.index("mali"), 'iran')
four_letter_countries.remove('india')
four_letter_countries.reverse()
four_letter_countries[four_letter_countries.index("greenland")] = "toga"
four_letter_countries.append('laos')
four_letter_countries.reverse()
four_letter_countries.insert(0, 'peru')




print four_letter_countries
