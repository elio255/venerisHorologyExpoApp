import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)', 
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#333',
    color: 'white',
    borderRadius: 5,
    fontSize: 16,
  },
  textarea: {
    width: '100%',
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#333',
    color: 'white',
    borderRadius: 5,
    fontSize: 16,
    textAlignVertical: 'top', 
  },
  button: {
    backgroundColor: '#C5A580',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  locationBox: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    padding: 15,
    marginTop: 45,
    borderRadius: 10,
    width: '80%',
    alignItems: 'flex-start', 
  },
  locationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  locationText: {
    fontSize: 16,
    color: 'white',
    marginVertical: 2,
  },
  viewButton: {
    backgroundColor: '#C5A580',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  viewButtonText: {
    color: 'black',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default styles;
