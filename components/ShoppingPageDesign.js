import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#121212',
  },
  sidebar: {
    width: 150,
    padding: 10,
    backgroundColor: '#1f1f1f',
  },
  sidebarCollapsed: {
    width: 50,
    padding: 10,
    backgroundColor: '#1f1f1f',
    alignItems: 'center',
  },
  filterToggle: {
    backgroundColor: '#1f1f1f',
    padding: 5,
    alignItems: 'center',
  },
  sidebarTitle: {
    color: '#C5A580',
    fontSize: 16,
  },
  checkboxContainer: {
    marginTop: 10,
  },
  checkbox: {
    color: '#C5A580',
    marginBottom: 10,
    textAlign: 'left',
  },
  checkboxSelected: {
    color: '#ffffff',
  },
  content: {
    flex: 1,
    padding: 10,
  },
  header: {
    color: '#ffffff',
    fontSize: 20,
    marginBottom: 10,
  },
  searchBar: {
    backgroundColor: '#2E2E2E',
    color: '#C5A580',
    borderRadius: 20,
    padding: 10,
    marginBottom: 10,
  },
  watchGrid: {
    flex: 1,
  },
  flatListContainer: {
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#1f1f1f',
    borderRadius: 10,
    padding: 10,
    margin: 10,
    alignItems: 'center',
    flex: 0.5,
  },
  imageSmall: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginBottom: 10,
  },
  imageLarge: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    color: '#C5A580',
    fontSize: 16,
    textAlign: 'center',
  },
  price: {
    color: '#ffffff',
    fontSize: 14,
  },
});

export default styles;
