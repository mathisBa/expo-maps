# Radar Maps

Une application mobile développée avec Expo (React Native) qui affiche les radars routiers en France à partir des données ouvertes du gouvernement.

## Fonctionnalités

- **Carte Interactive** : Affiche les radars sur une carte en utilisant `react-native-maps`.
- **Clustering** : Regroupe les radars proches à des niveaux de zoom élevés pour une meilleure lisibilité.
- **Géolocalisation** : Centre la carte sur la position de l'utilisateur au démarrage et sur demande.
- **Données en Temps Réel** : Charge la liste des radars depuis le site `data.gouv.fr` au lancement de l'application.
- **Vue Liste** : Affiche les radars visibles dans une liste triée par distance par rapport à l'utilisateur.
- **Filtrage** : Permet de filtrer les radars affichés par type (radar fixe, de feu rouge, de vitesse moyenne, etc.).
- **Icônes Personnalisées** : Utilise des icônes différentes pour chaque type de radar pour une identification rapide.
- **Interface Soignée** : Utilise des effets de flou (`BlurView`) pour certains éléments de l'interface.

## Prérequis

Avant de commencer, assurez-vous d'avoir installé les outils suivants :
- [Node.js](https://nodejs.org/) (version LTS recommandée)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (optionnel, mais recommandé)

```bash
npm install -g expo-cli
```

## Installation et Lancement

1.  **Clonez le dépôt :**
    ```bash
    git clone https://github.com/votre-utilisateur/radar-maps.git
    cd radar-maps
    ```

2.  **Installez les dépendances :**
    ```bash
    npm install
    ```
    ou
    ```bash
    yarn install
    ```

3.  **Lancez l'application :**
    - Pour démarrer le serveur de développement Metro :
      ```bash
      npm start
      ```
    - Pour lancer sur un appareil ou un émulateur Android :
      ```bash
      npm run android
      ```
    - Pour lancer sur un appareil ou un simulateur iOS :
      ```bash
      npm run ios
      ```
    - Pour lancer dans un navigateur web :
      ```bash
      npm run web
      ```

## Dépendances Principales

- **[Expo](https://expo.dev/)**: Plateforme pour créer des applications universelles avec React.
- **[React Native](https://reactnative.dev/)**: Framework pour construire des applications natives avec React.
- **[Expo Router](https://docs.expo.dev/router/introduction/)**: Système de navigation basé sur les fichiers.
- **[React Native Maps](https://github.com/react-native-maps/react-native-maps)**: Composants de carte pour iOS et Android.
- **[React Native Map Clustering](https://github.com/venits/react-native-map-clustering)**: Clustering de marqueurs pour `react-native-maps`.
- **[Expo Location](https://docs.expo.dev/versions/latest/sdk/location/)**: Pour accéder à la géolocalisation de l'appareil.
- **[Papa Parse](https://www.papaparse.com/)**: Pour parser les données CSV des radars.