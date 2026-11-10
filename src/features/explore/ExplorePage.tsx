import { IonContent, IonList, IonPage } from '@ionic/react';
import { useMemo, useState } from 'react';
import type { ReactElement } from 'react';

import { AppCard, AppEmptyState, AppHeader, AppListItem, AppSearchBar } from '../../design-system';

const destinations = [
  {
    id: '1',
    title: 'Harbor Market',
    subtitle: 'Fresh produce, coffee carts, and weekend makers.',
  },
  {
    id: '2',
    title: 'North Pier Trail',
    subtitle: 'Coastal walk with sunrise lookouts and bike lanes.',
  },
  {
    id: '3',
    title: 'Cedar Library Annex',
    subtitle: 'Quiet study rooms and community workshops.',
  },
  {
    id: '4',
    title: 'Riverfront Studio',
    subtitle: 'Pop-up gallery featuring local photographers.',
  },
  {
    id: '5',
    title: 'Elm Street Kitchen',
    subtitle: 'Seasonal menus and outdoor seating until dusk.',
  },
];

export function ExplorePage(): ReactElement {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      return destinations;
    }
    return destinations.filter(
      (item) =>
        item.title.toLowerCase().includes(normalized) ||
        item.subtitle.toLowerCase().includes(normalized),
    );
  }, [query]);

  return (
    <IonPage>
      <AppHeader title="Explore" />
      <IonContent fullscreen>
        <div className="page-container stack-lg">
          <AppSearchBar
            value={query}
            onChange={setQuery}
            placeholder="Search places and experiences"
          />

          <AppCard
            title="Featured this week"
            subtitle="Hand-picked local stops to demo list and search patterns."
            variant="elevated"
          >
            Tap any item to see navigation-ready list rows in action.
          </AppCard>

          {filtered.length === 0 ? (
            <AppEmptyState
              title="No matches"
              description="Try a different search term or clear the filter."
              icon="searchOutline"
              actionLabel="Clear search"
              onAction={() => setQuery('')}
            />
          ) : (
            <IonList lines="none" className="stack">
              {filtered.map((item) => (
                <AppCard key={item.id} variant="outlined">
                  <AppListItem
                    title={item.title}
                    subtitle={item.subtitle}
                    leadingIcon="compassOutline"
                    lines="none"
                    detail={false}
                  />
                </AppCard>
              ))}
            </IonList>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
}
