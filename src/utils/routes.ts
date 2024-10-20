interface Routes {
  index: () => string;
  history: () => string;
}

export const routes: Routes = {
  index: () => '/',
  history: () => '/history',
};
