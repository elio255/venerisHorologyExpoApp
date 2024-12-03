import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
  },
  notFound: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
  header: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginRight: 20,
  },
  info: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  price: {
    fontSize: 20,
    color: '#C5A580',
    marginBottom: 10,
    width:200,
  },
  description: {
    fontSize: 16,
    color: '#aaaaaa',
  },
  attributes: {
    marginBottom: 20,
  },
  attributeText: {
    fontSize: 16,
    color: '#ffffff',
    marginBottom: 5,
  },
  attributeLabel: {
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#C5A580',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cartButton: {
    marginTop: 20,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  cartButtonText: {
    color: '#C5A580',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default styles;
