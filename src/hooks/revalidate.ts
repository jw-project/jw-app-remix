import {
  useNavigate,
  useRevalidator as useRevalidatorRemix,
} from '@remix-run/react';

export function useRevalidator() {
  const { revalidate } = useRevalidatorRemix();
  const navigate = useNavigate();
  const navigateAndRevalidate = (url: string) => {
    navigate(url, {
      replace: false,
      preventScrollReset: true,
    });
  };

  return { revalidate, navigate: navigateAndRevalidate };
}
