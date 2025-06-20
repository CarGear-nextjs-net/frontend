import { useTranslations } from "next-intl";

export function withTranslations(namespace) {
  return function (WrappedComponent) {
    return function TranslatedComponent(props) {
      const t = useTranslations(namespace);
      return <WrappedComponent {...props} t={t} />;
    };
  };
}
