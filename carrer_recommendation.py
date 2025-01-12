import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score,classification_report
import joblib


data=pd.read_csv("stud.csv")
#data.head()
X=data.iloc[:,:-1]
y=data['Courses']

label_encoder=LabelEncoder()
y_encoded=label_encoder.fit_transform(y)

X_train,X_test,y_train,y_test=train_test_split(X,y_encoded,test_size=0.2,random_state=42)
#X_train.shape,X_test.shape,y_train.shape,y_test.shape

logistic_model=LogisticRegression(max_iter=500,random_state=42)
logistic_model.fit(X_train,y_train)

y_pred_logistic=logistic_model.predict(X_test)

logistic_accuracy=accuracy_score(y_test,y_pred_logistic)
logistic_report=classification_report(y_test,y_pred_logistic,target_names=label_encoder.classes_)
#logistic_accuracy,logistic_report


# Function to recommend a career
def recommend_career_terminal():
    print("Enter your preferences for the following features (1 for Yes, 0 for No):")
    user_input = {}

    # Iterate through all features
    for feature in X.columns:
        while True:
            try:
                value = int(input(f"{feature}: "))
                if value in [0, 1]:  # Accept only 0 or 1
                    user_input[feature] = value
                    break
                else:
                    print("Please enter 1 for Yes or 0 for No.")
            except ValueError:
                print("Invalid input. Please enter 1 for Yes or 0 for No.")
    
    # Convert to DataFrame
    user_df = pd.DataFrame([user_input], columns=X.columns)
    
    # Predict career
    predicted_class = logistic_model.predict(user_df)[0]
    career = label_encoder.inverse_transform([predicted_class])[0]
    
    # Display the result
    print(f"\nRecommended Career: {career}")

# Run the recommendation system
recommend_career_terminal()

joblib.dump(logistic_model, "logistic_model.pkl")
joblib.dump(label_encoder, "label_encoder.pkl")


