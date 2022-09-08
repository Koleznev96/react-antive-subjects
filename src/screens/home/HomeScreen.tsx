import React, { useEffect, useState } from 'react'
import { FlatList, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import CardSubject from '../../components/cardSubject/CardSubject'
import { ActionCreatorWithPayload } from '@reduxjs/toolkit'
import GlobalStyle from '../../components/GlobalStyle'
import Button from '../../components/ui/button/Button'
import { useActions } from '../../lib/hooks/actions'
import { useAppSelector } from '../../lib/hooks/redux'
import { styles } from './useStyles'
import FilterPopup from '../../components/popup/filterPopup/FilterPopup'
import { filterSubjects } from '../../helpers/filters'
import SubjectPopup from '../../components/popup/subjectPopup/SubjectPopup'

interface Props {
  updateSubjects: ActionCreatorWithPayload<Subject, string>
  deleteItem: ActionCreatorWithPayload<Subject, string>
}

const HomeScreen = () => {
  const { updateSubjects, deleteItem }: Props = useActions()
  const { subjects }: SubjectsInit = useAppSelector(state => state.subjects)
  const [statusViewFilter, setStatusViewFilter] = useState(false)
  const [statusCreateView, setStatusCreateView] = useState(false)
  const [filterData, setFilterData] = useState(subjects)
  const [statusFilter, setStatusFilter] = useState('Показывать все задания')

  const viewFilter = () => {
    setStatusViewFilter(!statusViewFilter)
  }

  const viewAdd = () => {
    setStatusCreateView(!statusCreateView)
  }

  const filterHandler = (status: string) => {
    setStatusViewFilter(false)
    if (status === 'default') {
      return
    }
    setStatusFilter(status)
    const newDataFilter = filterSubjects(subjects, status)
    setFilterData(newDataFilter)
  }

  useEffect(() => {
    const newDataFilter = filterSubjects(subjects, statusFilter)
    setFilterData(newDataFilter ? newDataFilter : filterData)
  }, [subjects])

  const updateStatusCard = (item: Subject) => {
    updateSubjects(
      subjects.map((subject: Subject) => {
        if (subject.id !== item.id) {
          return subject
        } else {
          return { ...subject, status: !item.status }
        }
      }),
    )
  }

  return (
    <SafeAreaView style={GlobalStyle.bodyRoot}>
      <FilterPopup onPress={filterHandler} statusView={statusViewFilter} />
      <SubjectPopup
        statusView={statusCreateView}
        setStatusView={setStatusCreateView}
      />
      <View style={styles.containerHeader}>
        <Button
          label={statusFilter}
          onPress={viewFilter}
          style={styles.buttonFilter}
          styleLabel={styles.buttonFilterLabel}
        />
      </View>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsHorizontalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {subjects.length > 0 ? (
          filterData.map((item: Subject) => (
            <CardSubject
              key={item.id}
              data={item}
              updateSubjects={updateStatusCard}
              deleteCard={deleteItem}
            />
          ))
        ) : (
          <Text style={[GlobalStyle.CustomFontRegular, styles.emptyList]}>
            Список пуст
          </Text>
        )}
        <Button
          label="Добавить"
          onPress={viewAdd}
          style={styles.buttonAdd}
          styleLabel={styles.buttonAddLabel}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen
