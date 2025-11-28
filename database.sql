
CREATE TABLE utilisateur (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(100),
    prenom VARCHAR(100),
    email VARCHAR(150) UNIQUE,
    mot_de_passe VARCHAR(255),
    role ENUM('SUPER_ADMIN', 'ORGANISATEUR', 'COMMUNICANT', 'PARTICIPANT', 'MEMBRE_COMITE', 'INVITE', 'RESP_WORKSHOP'),
    photo VARCHAR(255),
    institution VARCHAR(255),
    domaine_recherche VARCHAR(255),
    biographie TEXT
);

-- Événement
CREATE TABLE evenement (
    id INT PRIMARY KEY AUTO_INCREMENT,
    titre VARCHAR(255),
    description TEXT,
    date_debut DATE,
    date_fin DATE,
    lieu VARCHAR(255),
    thematique VARCHAR(255),
    contact VARCHAR(255),
    id_organisateur INT,
    FOREIGN KEY (id_organisateur) REFERENCES utilisateur(id)
);

-- Comité scientifique
CREATE TABLE comite_scientifique (
    id INT PRIMARY KEY AUTO_INCREMENT,
    evenement_id INT,
    FOREIGN KEY (evenement_id) REFERENCES evenement(id)
);

-- Membre_comite (lien avec utilisateur & comité)
CREATE TABLE membre_comite (
    id INT PRIMARY KEY AUTO_INCREMENT,
    utilisateur_id INT,
    comite_id INT,
    FOREIGN KEY (utilisateur_id) REFERENCES utilisateur(id),
    FOREIGN KEY (comite_id) REFERENCES comite_scientifique(id)
);

-- Session
CREATE TABLE session (
    id INT PRIMARY KEY AUTO_INCREMENT,
    evenement_id INT,
    titre VARCHAR(255),
    horaire DATETIME,
    salle VARCHAR(80),
    president_id INT,
    FOREIGN KEY (evenement_id) REFERENCES evenement(id),
    FOREIGN KEY (president_id) REFERENCES utilisateur(id)
);

-- Communication (proposition)
CREATE TABLE communication (
    id INT PRIMARY KEY AUTO_INCREMENT,
    titre VARCHAR(255),
    resume TEXT,
    type ENUM('orale', 'affiche', 'poster'),
    fichier_pdf VARCHAR(255),
    etat ENUM('en_attente', 'acceptee', 'refusee', 'en_revision'),
    auteur_id INT,
    evenement_id INT,
    FOREIGN KEY (auteur_id) REFERENCES utilisateur(id),
    FOREIGN KEY (evenement_id) REFERENCES evenement(id)
);

-- Evaluation
CREATE TABLE evaluation (
    id INT PRIMARY KEY AUTO_INCREMENT,
    communication_id INT,
    membre_comite_id INT,
    note INT,
    commentaire TEXT,
    decision ENUM('accepter', 'refuser', 'corriger'),
    date_evaluation DATE,
    FOREIGN KEY (communication_id) REFERENCES communication(id),
    FOREIGN KEY (membre_comite_id) REFERENCES membre_comite(id)
);

-- Inscription
CREATE TABLE inscription (
    id INT PRIMARY KEY AUTO_INCREMENT,
    participant_id INT,
    evenement_id INT,
    statut_paiement ENUM('a_payer', 'paye_sur_place', 'paye'),
    badge VARCHAR(255),
    date_inscription DATE,
    FOREIGN KEY (participant_id) REFERENCES utilisateur(id),
    FOREIGN KEY (evenement_id) REFERENCES evenement(id)
);

-- Workshop
CREATE TABLE workshop (
    id INT PRIMARY KEY AUTO_INCREMENT,
    evenement_id INT,
    titre VARCHAR(255),
    responsable_id INT,
    date DATETIME,
    nb_places INT,
    FOREIGN KEY (evenement_id) REFERENCES evenement(id),
    FOREIGN KEY (responsable_id) REFERENCES utilisateur(id)
);

-- Inscription Workshop
CREATE TABLE inscription_workshop (
    id INT PRIMARY KEY AUTO_INCREMENT,
    participant_id INT,
    workshop_id INT,
    FOREIGN KEY (participant_id) REFERENCES utilisateur(id),
    FOREIGN KEY (workshop_id) REFERENCES workshop(id)
);

-- Conférencier invité
CREATE TABLE invite (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(100),
    prenom VARCHAR(100),
    email VARCHAR(150),
    evenement_id INT,
    sujet_conference VARCHAR(255),
    FOREIGN KEY (evenement_id) REFERENCES evenement(id)
);

-- Attestation
CREATE TABLE attestation (
    id INT PRIMARY KEY AUTO_INCREMENT,
    utilisateur_id INT,
    evenement_id INT,
    type ENUM('participant', 'communicant', 'membre_comite', 'organisateur'),
    date_generation DATE,
    fichier_pdf VARCHAR(255),
    FOREIGN KEY (utilisateur_id) REFERENCES utilisateur(id),
    FOREIGN KEY (evenement_id) REFERENCES evenement(id)
);

-- Statistiques
CREATE TABLE statistique (
    id INT PRIMARY KEY AUTO_INCREMENT,
    evenement_id INT,
    nb_soumissions INT,
    taux_acceptation FLOAT,
    repartSelsabil Bks, [23-11-2025 14:19]
ition_par_institution TEXT,
    participation_par_pays TEXT,
    FOREIGN KEY (evenement_id) REFERENCES evenement(id)
);

-- Message Interne
CREATE TABLE message_interne (
    id INT PRIMARY KEY AUTO_INCREMENT,
    expediteur_id INT,
    destinataire_id INT,
    evenement_id INT,
    contenu TEXT,
    date_envoi DATETIME,
    type ENUM('notif', 'reponse', 'modif_prog'),
    FOREIGN KEY(expediteur_id) REFERENCES utilisateur(id),
    FOREIGN KEY(destinataire_id) REFERENCES utilisateur(id),
    FOREIGN KEY(evenement_id) REFERENCES evenement(id)
);

