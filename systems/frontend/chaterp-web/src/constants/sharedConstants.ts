// systems/frontend/chaterp-web/src/constants/sharedConstants.ts

export const ACTION_MODES = {
    create: "create",
    readAll: "readAll",
    read: "read",
    update: "update",
    delete: "delete",
} as const;

export const BUTTON_LABELS = {
    ok: "OK",
    new: "Nouveau",
    create: "Créer",
    update: "Enregistrer",
    delete: "Supprimer",
    cancel: "Annuler",
    close: "Fermer",
    closeLogo: "✕",
    edit: "Modifier",
    return: "Retour",
} as const;

export const MESSAGES = {
    creating: "Création en cours...",
    loading: "Chargement en cours...",
    saving: "Sauvegarde en cours...",
    deleting: "Suppression en cours...",
    noData: "Aucune donnée à afficher.",
    createError: "Erreur lors de la création.",
    readError: "Erreur lors de la lecture.",
    updateError: "Erreur lors de la mise à jour.",
    deleteError: "Erreur lors de la suppression.",
    createSuccess: "Succès lors de la création.",
    readSuccess: "Succès lors de la lecture.",
    updateSuccess: "Succès lors de la mise à jour.",
    deleteSuccess: "Succès lors de la suppression.",
    confirmDeletePrefix: "Êtes-vous sûr de vouloir supprimer ",
    confirmDeleteSuffix: " ?",
    fieldsInvalid: "Certains champs sont incomplets ou contiennent des erreurs. Veuillez corriger les champs concernés.",
    unknownServerError: "Erreur serveur inconnue",
};

export const PLACEHOLDERS = {
    none: "-",
};
