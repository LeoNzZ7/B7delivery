export type getTenantResponse = {
  name: string,
  mainColor: string,
  secondColor: string
}

export const useApi = () => ({

  getTenant: (tenantSlug: string) => {
    switch(tenantSlug) {
      case 'b7burguer':
        return {
          name: 'B7burguer',
          mainColor: '#FB9400',
          secondColor: '#FFF9F2'
        } 
        break;
      case 'b7pizza':
        return {
          name: 'B7pizzas',
          mainColor: '#6AB70A',
          secondColor: '#E0E0E0'
        }
        break;
      dafault: return false;
    };
  }
});