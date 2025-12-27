# import os
# from flask import Flask, render_template, request, redirect, url_for, session, send_from_directory
# from deepface import DeepFace

# app = Flask(__name__)
# app.secret_key = "your_secret_key"

# UPLOAD_FOLDER = 'static/uploads/'
# DATABASE_FOLDER = 'static/images/faces'
# ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

# # ----------------- CRIMINALS_DB with all 25 entries ----------------- #
# CRIMINALS_DB = {
#    "m1-039-01.jpg" : {
#         "name": "John Doe",
#         "age": 32,
#         "dob": "March 5, 1992",
#         "first_crime": "Burglary",
#         "first_crime_location": "New York, NY",
#         "current_crime": "Robbery",
#         "current_crime_location": "Los Angeles, CA",
#         "charges": "Armed Robbery, Assault",
#         "pdf": "criminal3.pdf"  # <-- ADDED for PDF
#     },
#     "m1-018-01.jpg": {
#         "name": "Jane Smith",
#         "age": 28,
#         "dob": "July 12, 1996",
#         "first_crime": "Identity Theft",
#         "first_crime_location": "San Francisco, CA",
#         "current_crime": "Fraud",
#         "current_crime_location": "New York, NY",
#         "charges": "Financial Fraud, Money Laundering",
#         "pdf": "criminal2.pdf"  # <-- ADDED for PDF
#     },
#     "m1-003-01.jpg": {
#         "name": "Alex Brown",
#         "age": 40,
#         "dob": "December 1, 1983",
#         "first_crime": "Assault",
#         "first_crime_location": "Chicago, IL",
#         "current_crime": "Homicide",
#         "current_crime_location": "Houston, TX",
#         "charges": "Murder, Illegal Weapon Possession",
#     },
#     "f-012-01.jpg": {
#         "name": "Alex Brown",
#         "age": 40,
#         "dob": "December 1, 1983",
#         "first_crime": "Assault",
#         "first_crime_location": "Chicago, IL",
#         "current_crime": "Homicide",
#         "current_crime_location": "Houston, TX",
#         "charges": "Murder, Illegal Weapon Possession"
#     },
#     "f-013-01.jpg": {
#         "name": "John Smith",
#         "age": 29,
#         "dob": "July 4, 1994",
#         "first_crime": "Shoplifting",
#         "first_crime_location": "Seattle, WA",
#         "current_crime": "Armed Robbery",
#         "current_crime_location": "Portland, OR",
#         "charges": "Robbery, Aggravated Assault"
#     },
#     "f-014-01.jpg": {
#         "name": "Michael Johnson",
#         "age": 35,
#         "dob": "April 12, 1988",
#         "first_crime": "Identity Theft",
#         "first_crime_location": "San Francisco, CA",
#         "current_crime": "Cyber Fraud",
#         "current_crime_location": "Los Angeles, CA",
#         "charges": "Financial Fraud, Conspiracy"
#     },
#     "f-015-01.jpg": {
#         "name": "Emily Clark",
#         "age": 26,
#         "dob": "March 2, 1997",
#         "first_crime": "Vandalism",
#         "first_crime_location": "Denver, CO",
#         "current_crime": "Burglary",
#         "current_crime_location": "Phoenix, AZ",
#         "charges": "Breaking and Entering, Larceny"
#     },
#     "f-016-01.jpg": {
#         "name": "Sarah Lee",
#         "age": 41,
#         "dob": "September 15, 1982",
#         "first_crime": "Grand Theft Auto",
#         "first_crime_location": "Detroit, MI",
#         "current_crime": "Drug Trafficking",
#         "current_crime_location": "Chicago, IL",
#         "charges": "Possession with Intent, Distribution"
#     },
#     "f-017-01.jpg": {
#         "name": "David Rodriguez",
#         "age": 33,
#         "dob": "June 6, 1990",
#         "first_crime": "Assault",
#         "first_crime_location": "Boston, MA",
#         "current_crime": "Kidnapping",
#         "current_crime_location": "Providence, RI",
#         "charges": "Kidnapping, False Imprisonment"
#     },
#     "f-018-01.jpg": {
#         "name": "Jessica Miller",
#         "age": 24,
#         "dob": "January 25, 1999",
#         "first_crime": "Trespassing",
#         "first_crime_location": "Atlanta, GA",
#         "current_crime": "Armed Burglary",
#         "current_crime_location": "Miami, FL",
#         "charges": "Burglary with Weapon, Theft"
#     },
#     "f-019-01.jpg": {
#         "name": "James Thompson",
#         "age": 38,
#         "dob": "May 30, 1985",
#         "first_crime": "Arson",
#         "first_crime_location": "Houston, TX",
#         "current_crime": "Insurance Fraud",
#         "current_crime_location": "Dallas, TX",
#         "charges": "Fraudulent Claims, Arson"
#     },
#     "f-020-01.jpg": {
#         "name": "Patricia Johnson",
#         "age": 46,
#         "dob": "November 11, 1977",
#         "first_crime": "Embezzlement",
#         "first_crime_location": "Nashville, TN",
#         "current_crime": "Money Laundering",
#         "current_crime_location": "Memphis, TN",
#         "charges": "Financial Fraud, Tax Evasion"
#     },
#     "f-021-01.jpg": {
#         "name": "Christopher Davis",
#         "age": 31,
#         "dob": "February 8, 1992",
#         "first_crime": "Pickpocketing",
#         "first_crime_location": "New Orleans, LA",
#         "current_crime": "Credit Card Fraud",
#         "current_crime_location": "Baton Rouge, LA",
#         "charges": "Fraud, Possession of Stolen Property",
#         "pdf": "criminal1.pdf"  # <-- ADDED for PDF
#     },
#     "f-028-01.jpg": {
#         "name": "Jennifer Wilson",
#         "age": 36,
#         "dob": "October 1, 1987",
#         "first_crime": "Prostitution",
#         "first_crime_location": "Las Vegas, NV",
#         "current_crime": "Drug Possession",
#         "current_crime_location": "Reno, NV",
#         "charges": "Possession of Controlled Substances"
#     },
#     "f-029-01.jpg": {
#         "name": "Daniel Garcia",
#         "age": 27,
#         "dob": "August 14, 1996",
#         "first_crime": "Stalking",
#         "first_crime_location": "Tucson, AZ",
#         "current_crime": "Harassment",
#         "current_crime_location": "Phoenix, AZ",
#         "charges": "Criminal Harassment, Restraining Order Violation"
#     },
#     "f-030-01.jpg": {
#         "name": "Laura Martinez",
#         "age": 39,
#         "dob": "May 7, 1984",
#         "first_crime": "Check Fraud",
#         "first_crime_location": "Orlando, FL",
#         "current_crime": "Counterfeiting",
#         "current_crime_location": "Tampa, FL",
#         "charges": "Forgery, Counterfeit Currency"
#     },
#     "f-031-01.jpg": {
#         "name": "Robert Hernandez",
#         "age": 45,
#         "dob": "April 19, 1978",
#         "first_crime": "Extortion",
#         "first_crime_location": "El Paso, TX",
#         "current_crime": "Smuggling",
#         "current_crime_location": "San Diego, CA",
#         "charges": "Human Trafficking, Illegal Transportation"
#     },
#     "f-032-01.jpg": {
#         "name": "Ashley Clark",
#         "age": 30,
#         "dob": "June 22, 1993",
#         "first_crime": "Battery",
#         "first_crime_location": "San Antonio, TX",
#         "current_crime": "Domestic Violence",
#         "current_crime_location": "Austin, TX",
#         "charges": "Assault, Domestic Battery"
#     },
#     "f-034-01.jpg": {
#         "name": "Ryan Moore",
#         "age": 28,
#         "dob": "February 15, 1995",
#         "first_crime": "Disorderly Conduct",
#         "first_crime_location": "Cleveland, OH",
#         "current_crime": "Breaking and Entering",
#         "current_crime_location": "Columbus, OH",
#         "charges": "Forced Entry, Burglary"
#     },
#     "f-037-01.jpg": {
#         "name": "Donna White",
#         "age": 37,
#         "dob": "December 25, 1985",
#         "first_crime": "Public Intoxication",
#         "first_crime_location": "Milwaukee, WI",
#         "current_crime": "DUI",
#         "current_crime_location": "Madison, WI",
#         "charges": "Driving Under Influence, Reckless Endangerment"
#     },
#     "f-038-01.jpg": {
#         "name": "Anthony Miller",
#         "age": 42,
#         "dob": "September 10, 1981",
#         "first_crime": "Illegal Gambling",
#         "first_crime_location": "Atlantic City, NJ",
#         "current_crime": "Loan Sharking",
#         "current_crime_location": "Philadelphia, PA",
#         "charges": "Extortion, Racketeering"
#     },
#     "f-039-01.jpg": {
#         "name": "Kimberly Roberts",
#         "age": 34,
#         "dob": "November 28, 1988",
#         "first_crime": "Petty Theft",
#         "first_crime_location": "Salt Lake City, UT",
#         "current_crime": "Carjacking",
#         "current_crime_location": "Las Vegas, NV",
#         "charges": "Vehicle Theft, Assault with Deadly Weapon"
#     },
#     "f-040-01.jpg": {
#         "name": "Charles King",
#         "age": 50,
#         "dob": "January 11, 1973",
#         "first_crime": "Illegal Weapons Possession",
#         "first_crime_location": "Baltimore, MD",
#         "current_crime": "Attempted Murder",
#         "current_crime_location": "Washington, DC",
#         "charges": "Attempted Homicide, Firearms Violation"
#     },
#     "f-041-01.jpg": {
#         "name": "Brittany Adams",
#         "age": 25,
#         "dob": "October 16, 1998",
#         "first_crime": "Joyriding",
#         "first_crime_location": "Raleigh, NC",
#         "current_crime": "Hit and Run",
#         "current_crime_location": "Charlotte, NC",
#         "charges": "Vehicular Manslaughter, Leaving Scene"
#     },
#     "f-042-01.jpg": {
#         "name": "Joshua Nelson",
#         "age": 43,
#         "dob": "July 18, 1980",
#         "first_crime": "Forgery",
#         "first_crime_location": "Louisville, KY",
#         "current_crime": "Fraudulent Documents",
#         "current_crime_location": "Cincinnati, OH",
#         "charges": "Counterfeit IDs, Bank Fraud"
#     },
#     "f-043-01.jpg": {
#         "name": "Elizabeth Clark",
#         "age": 48,
#         "dob": "August 2, 1975",
#         "first_crime": "Blackmail",
#         "first_crime_location": "Sacramento, CA",
#         "current_crime": "Extortion",
#         "current_crime_location": "Fresno, CA",
#         "charges": "Threats, Illegal Coercion"
#     },
#      "subject-3.png": {
#         "name": "Elizabeth Clark",
#         "age": 48,
#         "dob": "August 2, 1975",
#         "first_crime": "Blackmail",
#         "first_crime_location": "Sacramento, CA",
#         "current_crime": "Extortion",
#         "current_crime_location": "Fresno, CA",
#         "charges": "Threats, Illegal Coercion",
#         "pdf": "criminal3.pdf"
        
#     }
    
# }
# # ----------------- END OF CRIMINALS_DB ----------------- #

# def allowed_file(filename):
#     return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# @app.route('/', methods=['GET', 'POST'])
# def login():
#     if request.method == 'POST':
#         username = request.form['username']
#         password = request.form['password']
#         if username == 'admin' and password == 'admin123':
#             session['user'] = username
#             return redirect(url_for('analyze'))
#         else:
#             return "Invalid credentials, try again."
#     return render_template('login.html')

# @app.route('/analyze', methods=['GET', 'POST'])
# def analyze():
#     if 'user' not in session:
#         return redirect(url_for('login'))

#     matched_images = []
#     matched_distances = []

#     if request.method == 'POST':
#         if 'file' not in request.files:
#             return "Error: No file uploaded"

#         file = request.files['file']
#         if file and allowed_file(file.filename):
#             temp_path = os.path.join(UPLOAD_FOLDER, file.filename)
#             file.save(temp_path)
#             try:
#                 # Use DeepFace to find matches
#                 result = DeepFace.find(img_path=temp_path, db_path=DATABASE_FOLDER, enforce_detection=False)
#                 if result and len(result) > 0:
#                     for df in result:
#                         if not df.empty:
#                             top_matches = df.head(15)
#                             for _, row in top_matches.iterrows():
#                                 matched_distances.append(row['distance'])
#                                 matched_images.append(os.path.basename(row['identity']))

#                 return render_template(
#                     'analyze.html',
#                     matched_images=list(zip(matched_images, matched_distances)),
#                     matched_distances=matched_distances,
#                     og_image=file.filename
#                 )

#             except Exception as e:
#                 return f"Error: {e}"
#         else:
#             return "File not allowed."

#     return render_template('analyze.html', matched_images=[])

# @app.route('/report/<filename>')
# def report(filename):
#     # Fetch criminal data dynamically
#     criminal_data = CRIMINALS_DB.get(filename, {
#         "name": "Unknown",
#         "age": "Unknown",
#         "dob": "Unknown",
#         "first_crime": "No Data Available",
#         "first_crime_location": "N/A",
#         "current_crime": "N/A",
#         "current_crime_location": "N/A",
#         "charges": "N/A"
#     })

#     # If there's a 'pdf' field, we pass it to the template
#     pdf_name = criminal_data.get("pdf", None)

#     return render_template('report.html', criminal=criminal_data, image=filename, pdf_name=pdf_name)

# @app.route('/see_pdf/<pdf_name>')
# def see_pdf(pdf_name):
#     """
#     Serve a PDF file from 'static/pdf'.
#     Make sure you have 'criminal1.pdf', 'criminal2.pdf', 'crimina31.pdf'
#     inside 'static/pdf/'.
#     """
#     return send_from_directory('static/pdf', pdf_name)

# @app.route('/logout')
# def logout():
#     session.pop('user', None)
#     return redirect(url_for('login'))

# if __name__ == '__main__':
#     os.makedirs(UPLOAD_FOLDER, exist_ok=True)
#     app.run(debug=True)

import os
from flask import Flask, render_template, request, redirect, url_for, session, send_from_directory
from deepface import DeepFace
from rembg import remove
from PIL import Image
import cv2
import numpy as np
from io import BytesIO

# Initialize app
app = Flask(__name__)
app.secret_key = "your_secret_key"

# Folders
UPLOAD_FOLDER = 'static/uploads/'
GENERATED_SKETCH_FOLDER = 'static/gen_sketch/'
DATABASE_FOLDER = 'static/images/faces'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

# Ensure upload and sketch directories exist
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(GENERATED_SKETCH_FOLDER, exist_ok=True)

# # ----------------- CRIMINALS_DB with all 25 entries ----------------- #
CRIMINALS_DB = {
    "m1-039-01.jpg": {
        "name": "John Doe",
        "age": 32,
        "dob": "March 5, 1992",
        "first_crime": "Burglary",
        "first_crime_location": "New York, NY",
        "current_crime": "Robbery",
        "current_crime_location": "Los Angeles, CA",
        "charges": "Armed Robbery, Assault",
        "pdf": "criminal3.pdf"
    },
    "m1-018-01.jpg": {
        "name": "Jane Smith",
        "age": 28,
        "dob": "July 12, 1996",
        "first_crime": "Identity Theft",
        "first_crime_location": "San Francisco, CA",
        "current_crime": "Fraud",
        "current_crime_location": "New York, NY",
        "charges": "Financial Fraud, Money Laundering",
        "pdf": "criminal2.pdf"
    },
    "m1-003-01.jpg": {
        "name": "Alex Brown",
        "age": 40,
        "dob": "December 1, 1983",
        "first_crime": "Assault",
        "first_crime_location": "Chicago, IL",
        "current_crime": "Homicide",
        "current_crime_location": "Houston, TX",
        "charges": "Murder, Illegal Weapon Possession"
    },
    "f-012-01.jpg": {
        "name": "Alex Brown",
        "age": 40,
        "dob": "December 1, 1983",
        "first_crime": "Assault",
        "first_crime_location": "Chicago, IL",
        "current_crime": "Homicide",
        "current_crime_location": "Houston, TX",
        "charges": "Murder, Illegal Weapon Possession"
    },
    "f-013-01.jpg": {
        "name": "John Smith",
        "age": 29,
        "dob": "July 4, 1994",
        "first_crime": "Shoplifting",
        "first_crime_location": "Seattle, WA",
        "current_crime": "Armed Robbery",
        "current_crime_location": "Portland, OR",
        "charges": "Robbery, Aggravated Assault"
    },
    "f-014-01.jpg": {
        "name": "Michael Johnson",
        "age": 35,
        "dob": "April 12, 1988",
        "first_crime": "Identity Theft",
        "first_crime_location": "San Francisco, CA",
        "current_crime": "Cyber Fraud",
        "current_crime_location": "Los Angeles, CA",
        "charges": "Financial Fraud, Conspiracy"
    },
    "f-015-01.jpg": {
        "name": "Emily Clark",
        "age": 26,
        "dob": "March 2, 1997",
        "first_crime": "Vandalism",
        "first_crime_location": "Denver, CO",
        "current_crime": "Burglary",
        "current_crime_location": "Phoenix, AZ",
        "charges": "Breaking and Entering, Larceny"
    },
    "f-016-01.jpg": {
        "name": "Sarah Lee",
        "age": 41,
        "dob": "September 15, 1982",
        "first_crime": "Grand Theft Auto",
        "first_crime_location": "Detroit, MI",
        "current_crime": "Drug Trafficking",
        "current_crime_location": "Chicago, IL",
        "charges": "Possession with Intent, Distribution"
    },
    "f-017-01.jpg": {
        "name": "David Rodriguez",
        "age": 33,
        "dob": "June 6, 1990",
        "first_crime": "Assault",
        "first_crime_location": "Boston, MA",
        "current_crime": "Kidnapping",
        "current_crime_location": "Providence, RI",
        "charges": "Kidnapping, False Imprisonment"
    },
    "f-018-01.jpg": {
        "name": "Jessica Miller",
        "age": 24,
        "dob": "January 25, 1999",
        "first_crime": "Trespassing",
        "first_crime_location": "Atlanta, GA",
        "current_crime": "Armed Burglary",
        "current_crime_location": "Miami, FL",
        "charges": "Burglary with Weapon, Theft"
    },
    "f-019-01.jpg": {
        "name": "James Thompson",
        "age": 38,
        "dob": "May 30, 1985",
        "first_crime": "Arson",
        "first_crime_location": "Houston, TX",
        "current_crime": "Insurance Fraud",
        "current_crime_location": "Dallas, TX",
        "charges": "Fraudulent Claims, Arson"
    },
    "f-020-01.jpg": {
        "name": "Patricia Johnson",
        "age": 46,
        "dob": "November 11, 1977",
        "first_crime": "Embezzlement",
        "first_crime_location": "Nashville, TN",
        "current_crime": "Money Laundering",
        "current_crime_location": "Memphis, TN",
        "charges": "Financial Fraud, Tax Evasion"
    },
    "f-021-01.jpg": {
        "name": "Christopher Davis",
        "age": 31,
        "dob": "February 8, 1992",
        "first_crime": "Pickpocketing",
        "first_crime_location": "New Orleans, LA",
        "current_crime": "Credit Card Fraud",
        "current_crime_location": "Baton Rouge, LA",
        "charges": "Fraud, Possession of Stolen Property",
        "pdf": "criminal1.pdf"
    },
    "f-028-01.jpg": {
        "name": "Jennifer Wilson",
        "age": 36,
        "dob": "October 1, 1987",
        "first_crime": "Prostitution",
        "first_crime_location": "Las Vegas, NV",
        "current_crime": "Drug Possession",
        "current_crime_location": "Reno, NV",
        "charges": "Possession of Controlled Substances"
    },
    "f-029-01.jpg": {
        "name": "Daniel Garcia",
        "age": 27,
        "dob": "August 14, 1996",
        "first_crime": "Stalking",
        "first_crime_location": "Tucson, AZ",
        "current_crime": "Harassment",
        "current_crime_location": "Phoenix, AZ",
        "charges": "Criminal Harassment, Restraining Order Violation"
    },
    "f-030-01.jpg": {
        "name": "Laura Martinez",
        "age": 39,
        "dob": "May 7, 1984",
        "first_crime": "Check Fraud",
        "first_crime_location": "Orlando, FL",
        "current_crime": "Counterfeiting",
        "current_crime_location": "Tampa, FL",
        "charges": "Forgery, Possession of Counterfeit Items"
    },
     "subject-3.png": {
        "name": "Zaibunnisa Malik",
        "age": 48,
        
        "dob": "August 2, 1975",
        "first_crime": "Blackmail",
        "first_crime_location": "Sacramento, CA",
        "current_crime": "Extortion",
        "current_crime_location": "Fresno, CA",
        "charges": "Threats, Illegal Coercion",
        "pdf": "criminal3.pdf"
        
    }
}


# CRIMINALS_DB = {
#    "m1-039-01.jpg" : {
#         "name": "John Doe",
#         "age": 32,
#         "dob": "March 5, 1992",
#         "first_crime": "Burglary",
#         "first_crime_location": "New York, NY",
#         "current_crime": "Robbery",
#         "current_crime_location": "Los Angeles, CA",
#         "charges": "Armed Robbery, Assault",
#         "pdf": "criminal3.pdf"  # <-- ADDED for PDF
#     },
#     "m1-018-01.jpg": {
#         "name": "Jane Smith",
#         "age": 28,
#         "dob": "July 12, 1996",
#         "first_crime": "Identity Theft",
#         "first_crime_location": "San Francisco, CA",
#         "current_crime": "Fraud",
#         "current_crime_location": "New York, NY",
#         "charges": "Financial Fraud, Money Laundering",
#         "pdf": "criminal2.pdf"  # <-- ADDED for PDF
#     },
#     "m1-003-01.jpg": {
#         "name": "Alex Brown",
#         "age": 40,
#         "dob": "December 1, 1983",
#         "first_crime": "Assault",
#         "first_crime_location": "Chicago, IL",
#         "current_crime": "Homicide",
#         "current_crime_location": "Houston, TX",
#         "charges": "Murder, Illegal Weapon Possession",
#     },
#     "f-012-01.jpg": {
#         "name": "Alex Brown",
#         "age": 40,
#         "dob": "December 1, 1983",
#         "first_crime": "Assault",
#         "first_crime_location": "Chicago, IL",
#         "current_crime": "Homicide",
#         "current_crime_location": "Houston, TX",
#         "charges": "Murder, Illegal Weapon Possession"
#     },
#     "f-013-01.jpg": {
#         "name": "John Smith",
#         "age": 29,
#         "dob": "July 4, 1994",
#         "first_crime": "Shoplifting",
#         "first_crime_location": "Seattle, WA",
#         "current_crime": "Armed Robbery",
#         "current_crime_location": "Portland, OR",
#         "charges": "Robbery, Aggravated Assault"
#     },
#     "f-014-01.jpg": {
#         "name": "Michael Johnson",
#         "age": 35,
#         "dob": "April 12, 1988",
#         "first_crime": "Identity Theft",
#         "first_crime_location": "San Francisco, CA",
#         "current_crime": "Cyber Fraud",
#         "current_crime_location": "Los Angeles, CA",
#         "charges": "Financial Fraud, Conspiracy"
#     },
#     "f-015-01.jpg": {
#         "name": "Emily Clark",
#         "age": 26,
#         "dob": "March 2, 1997",
#         "first_crime": "Vandalism",
#         "first_crime_location": "Denver, CO",
#         "current_crime": "Burglary",
#         "current_crime_location": "Phoenix, AZ",
#         "charges": "Breaking and Entering, Larceny"
#     },
#     "f-016-01.jpg": {
#         "name": "Sarah Lee",
#         "age": 41,
#         "dob": "September 15, 1982",
#         "first_crime": "Grand Theft Auto",
#         "first_crime_location": "Detroit, MI",
#         "current_crime": "Drug Trafficking",
#         "current_crime_location": "Chicago, IL",
#         "charges": "Possession with Intent, Distribution"
#     },
#     "f-017-01.jpg": {
#         "name": "David Rodriguez",
#         "age": 33,
#         "dob": "June 6, 1990",
#         "first_crime": "Assault",
#         "first_crime_location": "Boston, MA",
#         "current_crime": "Kidnapping",
#         "current_crime_location": "Providence, RI",
#         "charges": "Kidnapping, False Imprisonment"
#     },
#     "f-018-01.jpg": {
#         "name": "Jessica Miller",
#         "age": 24,
#         "dob": "January 25, 1999",
#         "first_crime": "Trespassing",
#         "first_crime_location": "Atlanta, GA",
#         "current_crime": "Armed Burglary",
#         "current_crime_location": "Miami, FL",
#         "charges": "Burglary with Weapon, Theft"
#     },
#     "f-019-01.jpg": {
#         "name": "James Thompson",
#         "age": 38,
#         "dob": "May 30, 1985",
#         "first_crime": "Arson",
#         "first_crime_location": "Houston, TX",
#         "current_crime": "Insurance Fraud",
#         "current_crime_location": "Dallas, TX",
#         "charges": "Fraudulent Claims, Arson"
#     },
#     "f-020-01.jpg": {
#         "name": "Patricia Johnson",
#         "age": 46,
#         "dob": "November 11, 1977",
#         "first_crime": "Embezzlement",
#         "first_crime_location": "Nashville, TN",
#         "current_crime": "Money Laundering",
#         "current_crime_location": "Memphis, TN",
#         "charges": "Financial Fraud, Tax Evasion"
#     },
#     "f-021-01.jpg": {
#         "name": "Christopher Davis",
#         "age": 31,
#         "dob": "February 8, 1992",
#         "first_crime": "Pickpocketing",
#         "first_crime_location": "New Orleans, LA",
#         "current_crime": "Credit Card Fraud",
#         "current_crime_location": "Baton Rouge, LA",
#         "charges": "Fraud, Possession of Stolen Property",
#         "pdf": "criminal1.pdf"  # <-- ADDED for PDF
#     },
#     "f-028-01.jpg": {
#         "name": "Jennifer Wilson",
#         "age": 36,
#         "dob": "October 1, 1987",
#         "first_crime": "Prostitution",
#         "first_crime_location": "Las Vegas, NV",
#         "current_crime": "Drug Possession",
#         "current_crime_location": "Reno, NV",
#         "charges": "Possession of Controlled Substances"
#     },
#     "f-029-01.jpg": {
#         "name": "Daniel Garcia",
#         "age": 27,
#         "dob": "August 14, 1996",
#         "first_crime": "Stalking",
#         "first_crime_location": "Tucson, AZ",
#         "current_crime": "Harassment",
#         "current_crime_location": "Phoenix, AZ",
#         "charges": "Criminal Harassment, Restraining Order Violation"
#     },
#     "f-030-01.jpg": {
#         "name": "Laura Martinez",
#         "age": 39,
#         "dob": "May 7, 1984",
#         "first_crime": "Check Fraud",
#         "first_crime_location": "Orlando, FL",
#         "current_crime": "Counterfeiting",
#         "current_crime_location": "Tampa, FL",
#         "charges": "Forgery, Counterfeit Currency"
#     },
#     "f-031-01.jpg": {
#         "name": "Robert Hernandez",
#         "age": 45,
#         "dob": "April 19, 1978",
#         "first_crime": "Extortion",
#         "first_crime_location": "El Paso, TX",
#         "current_crime": "Smuggling",
#         "current_crime_location": "San Diego, CA",
#         "charges": "Human Trafficking, Illegal Transportation"
#     },
#     "f-032-01.jpg": {
#         "name": "Ashley Clark",
#         "age": 30,
#         "dob": "June 22, 1993",
#         "first_crime": "Battery",
#         "first_crime_location": "San Antonio, TX",
#         "current_crime": "Domestic Violence",
#         "current_crime_location": "Austin, TX",
#         "charges": "Assault, Domestic Battery"
#     },
#     "f-034-01.jpg": {
#         "name": "Ryan Moore",
#         "age": 28,
#         "dob": "February 15, 1995",
#         "first_crime": "Disorderly Conduct",
#         "first_crime_location": "Cleveland, OH",
#         "current_crime": "Breaking and Entering",
#         "current_crime_location": "Columbus, OH",
#         "charges": "Forced Entry, Burglary"
#     },
#     "f-037-01.jpg": {
#         "name": "Donna White",
#         "age": 37,
#         "dob": "December 25, 1985",
#         "first_crime": "Public Intoxication",
#         "first_crime_location": "Milwaukee, WI",
#         "current_crime": "DUI",
#         "current_crime_location": "Madison, WI",
#         "charges": "Driving Under Influence, Reckless Endangerment"
#     },
#     "f-038-01.jpg": {
#         "name": "Anthony Miller",
#         "age": 42,
#         "dob": "September 10, 1981",
#         "first_crime": "Illegal Gambling",
#         "first_crime_location": "Atlantic City, NJ",
#         "current_crime": "Loan Sharking",
#         "current_crime_location": "Philadelphia, PA",
#         "charges": "Extortion, Racketeering"
#     },
#     "f-039-01.jpg": {
#         "name": "Kimberly Roberts",
#         "age": 34,
#         "dob": "November 28, 1988",
#         "first_crime": "Petty Theft",
#         "first_crime_location": "Salt Lake City, UT",
#         "current_crime": "Carjacking",
#         "current_crime_location": "Las Vegas, NV",
#         "charges": "Vehicle Theft, Assault with Deadly Weapon"
#     },
#     "f-040-01.jpg": {
#         "name": "Charles King",
#         "age": 50,
#         "dob": "January 11, 1973",
#         "first_crime": "Illegal Weapons Possession",
#         "first_crime_location": "Baltimore, MD",
#         "current_crime": "Attempted Murder",
#         "current_crime_location": "Washington, DC",
#         "charges": "Attempted Homicide, Firearms Violation"
#     },
#     "f-041-01.jpg": {
#         "name": "Brittany Adams",
#         "age": 25,
#         "dob": "October 16, 1998",
#         "first_crime": "Joyriding",
#         "first_crime_location": "Raleigh, NC",
#         "current_crime": "Hit and Run",
#         "current_crime_location": "Charlotte, NC",
#         "charges": "Vehicular Manslaughter, Leaving Scene"
#     },
#     "f-042-01.jpg": {
#         "name": "Joshua Nelson",
#         "age": 43,
#         "dob": "July 18, 1980",
#         "first_crime": "Forgery",
#         "first_crime_location": "Louisville, KY",
#         "current_crime": "Fraudulent Documents",
#         "current_crime_location": "Cincinnati, OH",
#         "charges": "Counterfeit IDs, Bank Fraud"
#     },
#     "f-043-01.jpg": {
#         "name": "Elizabeth Clark",
#         "age": 48,
#         "dob": "August 2, 1975",
#         "first_crime": "Blackmail",
#         "first_crime_location": "Sacramento, CA",
#         "current_crime": "Extortion",
#         "current_crime_location": "Fresno, CA",
#         "charges": "Threats, Illegal Coercion"
#     },
#      "subject-3.png": {
#         "name": "Elizabeth Clark",
#         "age": 48,
#         "dob": "August 2, 1975",
#         "first_crime": "Blackmail",
#         "first_crime_location": "Sacramento, CA",
#         "current_crime": "Extortion",
#         "current_crime_location": "Fresno, CA",
#         "charges": "Threats, Illegal Coercion",
#         "pdf": "criminal3.pdf"
        
#     }
    
# }
# ----------------- END OF CRIMINALS_DB ----------------- #

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# --- ROUTES ---


def login():
    if request.method == 'POST':
        if request.form['username']=='admin' and request.form['password']=='admin123':
            session['user'] = 'admin'
            return redirect(url_for('dashboard'))
        return "Invalid credentials, try again."
    return render_template('login.html')


@app.route('/dashboard')
def dashboard():
    if 'user' not in session:
        return redirect(url_for('login'))
    # You can render a real dashboard.html—here we just redirect to analyze
    return redirect(url_for('analyze'))


@app.route('/analyze', methods=['GET', 'POST'])
def analyze():
    if 'user' not in session:
        return redirect(url_for('login'))

    matched = []
    if request.method == 'POST':
        file = request.files.get('file')
        if not file or not allowed_file(file.filename):
            return "No file or bad file type.", 400

        save_path = os.path.join(UPLOAD_FOLDER, file.filename)
        file.save(save_path)

        try:
            # DeepFace.find returns a list of DataFrames if db_path is a folder
            results = DeepFace.find(img_path=save_path, db_path=DATABASE_FOLDER, enforce_detection=False)
            for df in results:
                for _, row in df.head(15).iterrows():
                    matched.append((os.path.basename(row['identity']), row['distance']))
        except Exception as e:
            return f"Error running DeepFace: {e}", 500

        return render_template('analyze.html',
                               matched_images=matched,
                               og_image=file.filename)

    return render_template('analyze.html', matched_images=[])


# @app.route('/report/<filename>')
# def report(filename):
#     data = CRIMINALS_DB.get(filename, {
#         "name": "Unknown",
#         "age": "Unknown",
#         "dob": "Unknown",
#         "first_crime": "No Data",
#         "first_crime_location": "N/A",
#         "current_crime": "N/A",
#         "current_crime_location": "N/A",
#         "charges": "N/A",
#         "pdf": None
#     })
#     return render_template('report.html', criminal=data, image=filename)

#  # If there's a 'pdf' field, we pass it to the template
#     pdf_name = criminal_data.get("pdf", None)

#     return render_template('report.html', criminal=criminal_data, image=filename, pdf_name=pdf_name)

# @app.route('/see_pdf/<pdf_name>')
# def see_pdf(pdf_name):
#     """
#     Serve a PDF file from 'static/pdf'.
#     Make sure you have 'criminal1.pdf', 'criminal2.pdf', 'criminal3.pdf'
#     inside 'static/pdf/'.
#     """
#     return send_from_directory('static/pdf', pdf_name)

@app.route('/report/<filename>')
def report(filename):
    # Fetch criminal data dynamically
    criminal_data = CRIMINALS_DB.get(filename, {
        "name": "Unknown",
        "age": "Unknown",
        "dob": "Unknown",
        "first_crime": "No Data Available",
        "first_crime_location": "N/A",
        "current_crime": "N/A",
        "current_crime_location": "N/A",
        "charges": "N/A"
    })

    # If there's a 'pdf' field, we pass it to the template
    pdf_name = criminal_data.get("pdf", None)

    return render_template('report.html', criminal=criminal_data, image=filename, pdf_name=pdf_name)

@app.route('/see_pdf/<pdf_name>')
def see_pdf(pdf_name):
    """
    Serve a PDF file from 'static/pdf'.
    Make sure you have 'criminal1.pdf', 'criminal2.pdf', 'crimina31.pdf'
    inside 'static/pdf/'.
    """
    return send_from_directory('static/pdf', pdf_name)




@app.route('/sketch', methods=['GET', 'POST'])
def sketch():
    if 'user' not in session:
        return redirect(url_for('login'))

    if request.method=='POST':
        file = request.files.get('file')
        if not file or not allowed_file(file.filename):
            return "No file or bad file type.", 400

        save_path = os.path.join(UPLOAD_FOLDER, file.filename)
        file.save(save_path)

        # remove bg
        with open(save_path, "rb") as f:
            img = Image.open(BytesIO(remove(f.read())))
        img_np = np.array(img)

        # fill transparent pixels white
        bg = np.ones_like(img_np) * 255
        bg[...,3] = img_np[...,3]
        merged = np.where(img_np[...,3:] == 0, bg, img_np)

        # sketch effect
        bgr = cv2.cvtColor(merged, cv2.COLOR_RGBA2BGR)
        gray = cv2.cvtColor(bgr, cv2.COLOR_BGR2GRAY)
        inv = 255 - gray
        blur = cv2.GaussianBlur(inv, (51,51), 12)
        sketch = cv2.divide(gray, 255 - blur, scale=170)
        sketch = cv2.convertScaleAbs(sketch, alpha=2.1, beta=-110)

        out_name = 'sketch_' + file.filename
        out_path = os.path.join(GENERATED_SKETCH_FOLDER, out_name)
        cv2.imwrite(out_path, sketch)

        return render_template('sketch.html', out_image=out_name)

    return render_template('sketch.html')


@app.route('/logout')
def logout():
    session.pop('user', None)
    return redirect(url_for('login'))


if __name__ == '__main__':
    app.run(debug=True)
