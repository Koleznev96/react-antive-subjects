import { StyleSheet } from 'react-native'
import { Colors } from '../../utils/Colors'
import { relativeHeightPercent } from '../../utils/CustomerStyles'

export const styles = StyleSheet.create({
  containerHeader: {
    width: '100%',
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonFilter: {
    width: '100%',
    paddingVertical: 9,
    borderWidth: 2,
    borderColor: Colors.SecondaryColor,
    borderRadius: 8,
  },
  buttonFilterLabel: {
    fontSize: 14,
    color: Colors.SecondaryColor,
    lineHeight: 18,
  },
  scrollView: {
    width: '100%',
  },
  scrollViewContent: {
    width: '100%',
    paddingVertical: 16,
  },
  buttonAdd: {
    marginTop: 26,
    width: '100%',
    backgroundColor: Colors.SecondaryColor,
    paddingVertical: 16,
    borderRadius: 8,
  },
  buttonAddLabel: {
    fontSize: 16,
    color: Colors.MainColor,
  },
  emptyList: {
    marginTop: 30,
    width: '100%',
    textAlign: 'center',
    fontSize: 16,
    color: Colors.PrimaryColor,
    marginBottom: relativeHeightPercent(65),
  },
})
