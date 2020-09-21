import pytest
from python.common.helper import localize_timezone
from datetime import datetime
import python.common.prohibitions as pro


review_date_times = [
    ('IRP', "2020-09-10", "2020-09-15", "2020-09-18", "2020-09-23"),
    ('ADP', "2020-09-10", "2020-09-15", "2020-09-18", "2020-09-23"),
    ('IRP', "2020-09-10", "2020-09-11", "2020-09-16", "2020-09-23"),
    ('ADP', "2020-09-10", "2020-09-11", "2020-09-16", "2020-09-23"),
    ('IRP', "2020-09-10", "2020-09-16", "2020-09-19", "2020-09-23"),
    ('ADP', "2020-09-10", "2020-09-16", "2020-09-19", "2020-09-23"),
    ('UL', "2020-09-10", "2020-09-15", "2020-09-18", "2020-10-01"),
]


@pytest.mark.parametrize("prohib_type, date_served, today_is, min_expected, max_expected", review_date_times)
def test_get_application_window(prohib_type: str, date_served: str, today_is: str, min_expected: str, max_expected: str):
    iso = "%Y-%m-%d"
    date_served_object = localize_timezone(datetime.strptime(date_served, iso))
    today_object = localize_timezone(datetime.strptime(today_is, iso))
    prohibition = pro.prohibition_factory(prohib_type)
    result = prohibition.get_min_max_review_dates(date_served_object, today_object)
    assert result[0] == localize_timezone(datetime.strptime(min_expected, iso))
    assert result[1] == localize_timezone(datetime.strptime(max_expected, iso))


prohibition_types = [
    ('IRP', "ImmediateRoadside"),
    ('ADP', "AdministrativeDriving"),
    ('UL', "UnlicencedDriver"),
]


@pytest.mark.parametrize("prohib_type, class_expected", prohibition_types)
def test_prohibition_factory(prohib_type: str, class_expected: str):
    prohibition = pro.prohibition_factory(prohib_type)
    assert class_expected in str(prohibition.__class__)


def test_prohibition_unknown_factory():
    prohibition = pro.prohibition_factory('')
    assert prohibition is None
