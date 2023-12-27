import {
  useNavigate,
  useRevalidator as useRevalidatorRemix,
} from '@remix-run/react';

export function useRevalidator() {
  const { revalidate } = useRevalidatorRemix();
  const navigate = useNavigate();
  const navigateAndRevalidate = (
    url: string,
    options?: { mustRevalidate?: boolean },
  ) => {
    navigate(url, {
      replace: false,
      preventScrollReset: true,
    });
    options?.mustRevalidate && revalidate();
  };

  return { revalidate, navigate: navigateAndRevalidate };
}
