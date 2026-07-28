# Configuration de l'API Backend

## URL du Backend

Le frontend Mike utilise la variable d'environnement `VITE_API_URL` pour se connecter au backend.

### Backend en production
**URL actuelle:** https://mike-server.onrender.com

### Configuration

#### Fichier `.env`
Créer un fichier `.env` à la racine du projet frontend (`/mike/.env`):

```env
VITE_API_URL=https://mike-server.onrender.com
```

#### Fichier `.env.example`
Un fichier d'exemple existe pour référence:
```env
VITE_API_URL=https://mike-server.onrender.com
```

### Développement local

Pour utiliser un backend local pendant le développement:

```env
VITE_API_URL=http://localhost:3001
```

### Comportement par défaut

Si `VITE_API_URL` n'est pas défini:
- **Mode développement:** Utilise `http://[hostname]:3001`
- **Mode production:** Utilise `/api` (proxy relatif)

## Endpoints utilisés

### 1. Analyse de conversation
- **POST** `/api/analyze` - Démarre une nouvelle analyse
- **GET** `/api/analysis/:id/status` - Vérifie le statut
- **GET** `/api/analysis/:id/result` - Récupère les résultats

### 2. Chatbot assistant
- **POST** `/api/chat` - Envoie un message au chatbot

### 3. Health check
- **GET** `/api/health` - Vérifie l'état du serveur

## Build et déploiement

### Build pour production

```bash
npm run build
```

Le build va automatiquement utiliser la valeur de `VITE_API_URL` depuis le fichier `.env`.

### Variables d'environnement sur la plateforme de déploiement

Si vous déployez sur Netlify, Vercel, etc., définissez la variable:

```
VITE_API_URL=https://mike-server.onrender.com
```

⚠️ **Important:** Les variables Vite doivent commencer par `VITE_` pour être exposées au client.

## Test de la connexion

Pour tester si le backend est accessible:

```bash
curl https://mike-server.onrender.com/api/health
```

Réponse attendue:
```json
{
  "status": "ok",
  "provider": "mistral"
}
```

## Troubleshooting

### Erreur CORS
Si vous obtenez des erreurs CORS, vérifiez que:
1. Le backend a bien configuré CORS pour accepter votre domaine frontend
2. L'URL dans `.env` est correcte (pas de slash final)

### Backend indisponible
Render peut mettre le serveur en veille après inactivité:
- Le premier appel peut prendre 30-60 secondes
- Les appels suivants seront rapides

### Variables d'environnement non prises en compte
1. Redémarrer le serveur de développement: `npm run dev`
2. Rebuild l'application: `npm run build`
