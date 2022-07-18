export const UseApi = () => ({

  getTenant: (tenantSlug: string) => {
    switch (tenantSlug) {
      case 'b7burguer':
        return {
          slug: 'b7burguer',
          name: 'B7burguer',
          mainColor: '#FB9400',
          secondColor: '#FFF9F2'
        }
        break;

      case 'b7pizza':
        return {
          slug: 'b7pizza',
          name: 'B7pizza',
          mainColor: '#6AB70A',
          secondColor: '#E0E0E0'
        }
        break;

        dafault: return false;
    }
  }
});