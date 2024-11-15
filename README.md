# Ski and Snowshoe Size Finder
## Overview
The **Ski and Snowshoe Size Finder** is a web application designed to help users determine the optimal length and width for their skis, snowshoes, and ski poles. By inputting their weight, height, skiing style, skill level, and terrain type, users receive personalized equipment recommendations.

## Features
**Responsive Design**: Built with Bootstrap for a user-friendly interface on all devices.
**Unit Conversion**: Supports both metric and imperial units for weight and height.
**Ski Recommendations**: Suggests ski length, width, and specific models based on user input.
**Snowshoe Recommendations**: Calculates optimal snowshoe length considering weight and terrain.
**Ski Pole Recommendations**: Provides appropriate ski pole length for both classic cross-country and skate skiing.

## Technologies Used
**HTML**: Structure of the web application.
**CSS**: Styling and layout.
**JavaScript**: Dynamic calculations and interactivity.
**Bootstrap**: Responsive design framework.

## Usage
**Input User Information**:

**Weight**: Enter your weight and select the unit (kg or lbs).
**Height**: Enter your height and select the unit (cm or inches).
**Skiing Style**: Choose between Cross-Country or Skate.
**Skill Level**: Select Beginner, Intermediate, or Advanced.
**Terrain Type**: Pick Groomed Trails, Backcountry, or Mixed.

**Calculate Recommendations**:

Click the "Calculate" button to receive personalized recommendations for ski length, width, snowshoe length, and ski pole length.

**Reset Form**:

Click the "Reset" button to clear all input fields and start over.
Project Structure

## Detailed Explanation of Calculations
**Ski Length and Width**
**Classic Cross-Country Ski Length**:

Formula: Skier’s Height (cm) × 1.1 to 1.2
Adjustments:
Skill Level: Beginners use lower multiplier.
Weight: Adjust length ±5 cm based on weight deviations.
Terrain: Shorten length for backcountry terrain.
Skate Ski Length:

Formula: Skier’s Height (cm) × 1.05 to 1.1
Adjustments:
Similar considerations as cross-country.
Width:

Determined by skiing style and matched with specific ski models from our database.
Snowshoe Length
Formula:
Imperial: Weight (lbs) × 0.25
Metric: Weight (kg) × 0.11
Adjustments:
Terrain:
Backcountry: Add 5 inches for deeper snow.
Groomed Trails: Subtract 5 inches for maneuverability.
Ski Pole Length
Classic Cross-Country Ski Pole Length:

Formula: Skier’s Height (cm) × 0.83 to 0.85
Note: Poles should reach between the armpit and shoulder.
Skate Ski Pole Length:

Formula: Skier’s Height (cm) × 0.89 to 0.90
Note: Poles should reach between the chin and nose.
Adjustments:

Round to the nearest 5 cm increment, as poles are typically sold in these sizes.

## License
This project is licensed under the MIT License.

## Contact
For any questions or feedback, please contact:

David Muñoz Jensen
Email: davidmuje@gmail.com

Thank you for using the Ski and Snowshoe Size Finder!