# Grundkonzept für den Password Manager

## Einleitung

Dieses Dokument beschreibt das Grundkonzept für unseren Password Manager, der entwickelt wird, um Benutzern die sichere Verwaltung ihrer Passwörter zu ermöglichen. Das System basiert auf einer Client-Server-Architektur, wobei das Frontend mit React entwickelt wird und das Backend mit JavaScript realisiert wird. Als Datenbank benutzen Firebase.

## Architektur

Unsere Password Manager-Applikation besteht aus drei Hauptkomponenten:

1. **Frontend (React)**:
   - Das Frontend ist die Benutzeroberfläche, die Benutzern die Interaktion mit der Anwendung ermöglicht.
   - Es bietet Funktionen zum Anzeigen und Hinzufügen von Passwörtern.
   - Die Kommunikation mit dem Backend erfolgt über eine RESTful-API.

2. **Backend (NodeJS)**:
   - Das Backend ist für die Verarbeitung der Logik verantwortlich, einschließlich der Verwaltung von Passwörtern und Benutzerkonten.
   - Benutzerkonten und Passwörter werden sicher in einer Datenbank gespeichert.
   - Das Backend stellt RESTful-APIs zur Verfügung, um Daten abzurufen, zu speichern und zu verwalten.
   - Sicherheitsfunktionen wie Authentifizierung und Autorisierung werden im Backend implementiert.

3. **Datenbank (MongoDB)**:
   - Ermöglicht die verschlüsselung von Daten
   - Macht die Daten persistent

   

## Sicherheitsaspekte

Bei der Entwicklung des Password Managers stehen Sicherheitsaspekte im Vordergrund:g

1. **Authentifizierung und Autorisierung**:
   - Benutzer müssen sich mit ihren Zugangsdaten sicher authentifizieren, bevor sie auf ihre Passwörter zugreifen können.
   - Das Backend implementiert eine Autorisierung, um sicherzustellen, dass Benutzer nur auf ihre eigenen Passwörter zugreifen können.

2. **Passwortsicherheit**:
   - Die Passwörter werden encryptet und decryptet.

3. **Sicherer Datenaustausch**:
   - Die Kommunikation zwischen dem Frontend und Backend erfolgt über HTTPS, um sicherzustellen, dass Daten während der Übertragung geschützt sind.

## Fazit

Unser Grundkonzept für den Password Manager legt den Rahmen für die Entwicklung fest. Die Trennung von Frontend und Backend ermöglicht eine klare Aufgabenteilung und erleichtert die Skalierbarkeit und Wartbarkeit der Anwendung. Die Sicherheitsaspekte sind von zentraler Bedeutung, um die Vertraulichkeit und Integrität der Benutzerdaten zu gewährleisten.
