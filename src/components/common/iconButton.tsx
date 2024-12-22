import { Button, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface IconButtonProps {
  onClick: () => void;
}

export function EditIconButton({ onClick }: IconButtonProps) {
  const { t } = useTranslation();
  return (
    <Button
      variant="text"
      color="primary"
      startIcon={<EditIcon />}
      onClick={onClick}
      size="small"
    >
      <Typography variant="caption">{t("edit")}</Typography>
    </Button>
  );
}

export function DeleteIconButton({ onClick }: IconButtonProps) {
  const { t } = useTranslation();
  return (
    <Button
      variant="text"
      color="secondary"
      startIcon={<DeleteIcon />}
      onClick={onClick}
      size="small"
    >
      <Typography variant="caption">{t("delete")}</Typography>
    </Button>
  );
}
