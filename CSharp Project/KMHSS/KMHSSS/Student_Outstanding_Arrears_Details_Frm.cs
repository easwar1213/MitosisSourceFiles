using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Windows.Forms;
using System.Data.SqlClient;

namespace KMHSSS
{
    public partial class Arrear_Student_Individual_View_Details_Frm : Form
    {
        string query;
        int last = 0;
        SqlConnection con = new SqlConnection(@"Data Source=.\SQLEXPRESS;Initial Catalog=DBKMHSS;Integrated Security=True");
        public Arrear_Student_Individual_View_Details_Frm()
        {
            InitializeComponent();
        }

        private void Arrear_Student_Individual_View_Details_Frm_Load(object sender, EventArgs e)
        {
            try
            {
                fill_Class_CBox();
                fill_AYear_CBox();
                AYear_CHBox.Checked = true;
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }      

        public void fill_Class_CBox()
        {
            try
            {
                Class_CBox.Items.Clear();
                query = "select Class from Class_Master_Table";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    Class_CBox.Items.Add(dr["Class"].ToString());
                }
                con.Close();
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void fill_Section_CBox()
        {
            try
            {
                Sec_CBox.Items.Clear();
                query = "select Section from Section_Master_Table where Class='" + Class_CBox.Text + "'";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    Sec_CBox.Items.Add(dr["Section"].ToString());
                }
                con.Close();
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void fill_AYear_CBox()
        {
            try
            {
                SYear_CBox.Items.Clear();
                query = "select SYear from Academy_Year_Master_Table";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    SYear_CBox.Items.Add(dr["SYear"].ToString());
                }
                con.Close();
                last = SYear_CBox.Items.Count - 1;
                SYear_CBox.SelectedIndex = last;
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }
       
        public void ALFill_Grid()
        {
            try
            {
                query = "select A.Admission_No,A.Admis_Date,A.Std_Name,A.SYear,A.EYear,A.Class,A.Section,A.Group_Code,A.Branch,A.Gender,A.Accomm_Type,A.Van,A.Place,A.Trip_Type,A.Main_Type,A.SMonth,A.STerm,A.Concession_Amt,P.SchoolBillPay,P.HostelBillPay,P.VanBillPay,P.StationaryBillPay from Pending_Payment_Table P,Student_Admission_Master_Table A where P.Admission_No=A.Admission_No and A.Admission_No not in( select P.Admission_No from Pending_Payment_Table P where P.SchoolBillPay='0' AND P.HostelBillPay='0' AND P.VanBillPay='0' AND P.StationaryBillPay='0' and P.SYear='" + SYear_CBox.Text + "' and P.EYear='" + EYear_Txt.Text + "') and A.SYear='" + SYear_CBox.Text + "' and A.EYear='" + EYear_Txt.Text + "' and A.Class='" + Class_CBox.Text + "' and A.Section='" + Sec_CBox.Text + "' and A.Admission_No='" + Admis_No_Txt.Text + "' order by A.Class,A.Section,A.Gender Asc";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Student_Outstanding_Arrears_Details_dataGridView1.DataSource = dt;
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[1].HeaderText = "Admis No";
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[2].HeaderText = "Admis Date";
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[3].HeaderText = "Student Name";
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[4].HeaderText = "SYear";
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[5].HeaderText = "EYear";
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[6].HeaderText = "Class";
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[7].HeaderText = "Section";
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[8].HeaderText = "Group Code";
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[9].HeaderText = "Branch";
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[10].HeaderText = "Gender";
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[11].HeaderText = "Accomm Type";
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[12].HeaderText = "Van";
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[13].HeaderText = "Place";
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[14].HeaderText = "Trip Type";
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[15].HeaderText = "Main Type";
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[16].HeaderText = "SMonth";
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[17].HeaderText = "STerm";
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[18].HeaderText = "Concession";
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[19].HeaderText = "School Bill";
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[20].HeaderText = "Hostel Bill";
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[21].HeaderText = "Van Bill";
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[22].HeaderText = "Stationary Bill";
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[1].Width = 120;
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[2].Width = 120;
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[3].Width = 350;
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[4].Width = 120;
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[5].Width = 120;
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[6].Width = 120;
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[7].Width = 120;
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[8].Width = 150;
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[9].Width = 330;
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[10].Width = 120;
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[11].Width = 200;
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[12].Width = 150;
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[13].Width = 330;
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[14].Width = 150;
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[15].Width = 150;
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[16].Width = 150;
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[17].Width = 120;
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[18].Width = 200;
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[19].Width = 200;
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[20].Width = 200;
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[21].Width = 200;
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[22].Width = 200;
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void ACSFill_Grid()
        {
            try
            {
                query = "select A.Admission_No,A.Admis_Date,A.Std_Name,A.SYear,A.EYear,A.Class,A.Section,A.Group_Code,A.Branch,A.Gender,A.Accomm_Type,A.Van,A.Place,A.Trip_Type,A.Main_Type,A.SMonth,A.STerm,A.Concession_Amt,P.SchoolBillPay,P.HostelBillPay,P.VanBillPay,P.StationaryBillPay from Pending_Payment_Table P,Student_Admission_Master_Table A where P.Admission_No=A.Admission_No and A.Admission_No not in( select P.Admission_No from Pending_Payment_Table P where P.SchoolBillPay='0' AND P.HostelBillPay='0' AND P.VanBillPay='0' AND P.StationaryBillPay='0' and P.SYear='" + SYear_CBox.Text + "' and P.EYear='" + EYear_Txt.Text + "') and A.SYear='" + SYear_CBox.Text + "' and A.EYear='" + EYear_Txt.Text + "' and A.Class='" + Class_CBox.Text + "' and A.Section='" + Sec_CBox.Text + "' order by A.Class,A.Section,A.Gender Asc";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Student_Outstanding_Arrears_Details_dataGridView1.DataSource = dt;
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[1].HeaderText = "Admis No";
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[2].HeaderText = "Admis Date";
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[3].HeaderText = "Student Name";
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[4].HeaderText = "SYear";
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[5].HeaderText = "EYear";
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[6].HeaderText = "Class";
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[7].HeaderText = "Section";
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[8].HeaderText = "Group Code";
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[9].HeaderText = "Branch";
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[10].HeaderText = "Gender";
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[11].HeaderText = "Accomm Type";
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[12].HeaderText = "Van";
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[13].HeaderText = "Place";
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[14].HeaderText = "Trip Type";
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[15].HeaderText = "Main Type";
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[16].HeaderText = "SMonth";
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[17].HeaderText = "STerm";
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[18].HeaderText = "Concession";
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[19].HeaderText = "School Bill";
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[20].HeaderText = "Hostel Bill";
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[21].HeaderText = "Van Bill";
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[22].HeaderText = "Stationary Bill";
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[1].Width = 120;
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[2].Width = 120;
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[3].Width = 350;
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[4].Width = 120;
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[5].Width = 120;
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[6].Width = 120;
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[7].Width = 120;
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[8].Width = 150;
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[9].Width = 330;
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[10].Width = 120;
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[11].Width = 200;
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[12].Width = 150;
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[13].Width = 330;
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[14].Width = 150;
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[15].Width = 150;
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[16].Width = 150;
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[17].Width = 120;
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[18].Width = 200;
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[19].Width = 200;
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[20].Width = 200;
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[21].Width = 200;
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[22].Width = 200;
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void ACFill_Grid()
        {
            try
            {
                query = "select A.Admission_No,A.Admis_Date,A.Std_Name,A.SYear,A.EYear,A.Class,A.Section,A.Group_Code,A.Branch,A.Gender,A.Accomm_Type,A.Van,A.Place,A.Trip_Type,A.Main_Type,A.SMonth,A.STerm,A.Concession_Amt,P.SchoolBillPay,P.HostelBillPay,P.VanBillPay,P.StationaryBillPay from Pending_Payment_Table P,Student_Admission_Master_Table A where P.Admission_No=A.Admission_No and A.Admission_No not in( select P.Admission_No from Pending_Payment_Table P where P.SchoolBillPay='0' AND P.HostelBillPay='0' AND P.VanBillPay='0' AND P.StationaryBillPay='0' and P.SYear='" + SYear_CBox.Text + "' and P.EYear='" + EYear_Txt.Text + "') and A.SYear='" + SYear_CBox.Text + "' and A.EYear='" + EYear_Txt.Text + "' and A.Class='" + Class_CBox.Text + "' order by A.Class,A.Section,A.Gender Asc";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Student_Outstanding_Arrears_Details_dataGridView1.DataSource = dt;
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[1].HeaderText = "Admis No";
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[2].HeaderText = "Admis Date";
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[3].HeaderText = "Student Name";
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[4].HeaderText = "SYear";
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[5].HeaderText = "EYear";
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[6].HeaderText = "Class";
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[7].HeaderText = "Section";
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[8].HeaderText = "Group Code";
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[9].HeaderText = "Branch";
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[10].HeaderText = "Gender";
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[11].HeaderText = "Accomm Type";
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[12].HeaderText = "Van";
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[13].HeaderText = "Place";
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[14].HeaderText = "Trip Type";
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[15].HeaderText = "Main Type";
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[16].HeaderText = "SMonth";
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[17].HeaderText = "STerm";
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[18].HeaderText = "Concession";
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[19].HeaderText = "School Bill";
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[20].HeaderText = "Hostel Bill";
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[21].HeaderText = "Van Bill";
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[22].HeaderText = "Stationary Bill";
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[1].Width = 120;
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[2].Width = 120;
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[3].Width = 350;
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[4].Width = 120;
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[5].Width = 120;
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[6].Width = 120;
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[7].Width = 120;
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[8].Width = 150;
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[9].Width = 330;
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[10].Width = 120;
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[11].Width = 200;
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[12].Width = 150;
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[13].Width = 330;
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[14].Width = 150;
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[15].Width = 150;
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[16].Width = 150;
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[17].Width = 120;
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[18].Width = 200;
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[19].Width = 200;
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[20].Width = 200;
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[21].Width = 200;
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[22].Width = 200;
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void AFill_Grid()
        {
            try
            {
                query = "select A.Admission_No,A.Admis_Date,A.Std_Name,A.SYear,A.EYear,A.Class,A.Section,A.Group_Code,A.Branch,A.Gender,A.Accomm_Type,A.Van,A.Place,A.Trip_Type,A.Main_Type,A.SMonth,A.STerm,A.Concession_Amt,P.SchoolBillPay,P.HostelBillPay,P.VanBillPay,P.StationaryBillPay from Pending_Payment_Table P,Student_Admission_Master_Table A where P.Admission_No=A.Admission_No and A.Admission_No not in( select P.Admission_No from Pending_Payment_Table P where P.SchoolBillPay='0' AND P.HostelBillPay='0' AND P.VanBillPay='0' AND P.StationaryBillPay='0' and P.SYear='" + SYear_CBox.Text + "' and P.EYear='" + EYear_Txt.Text + "') and A.SYear='" + SYear_CBox.Text + "' and A.EYear='" + EYear_Txt.Text + "' order by A.Class,A.Section,A.Gender Asc";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Student_Outstanding_Arrears_Details_dataGridView1.DataSource = dt;
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[1].HeaderText = "Admis No";
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[2].HeaderText = "Admis Date";
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[3].HeaderText = "Student Name";
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[4].HeaderText = "SYear";
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[5].HeaderText = "EYear";
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[6].HeaderText = "Class";
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[7].HeaderText = "Section";
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[8].HeaderText = "Group Code";
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[9].HeaderText = "Branch";
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[10].HeaderText = "Gender";
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[11].HeaderText = "Accomm Type";
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[12].HeaderText = "Van";
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[13].HeaderText = "Place";
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[14].HeaderText = "Trip Type";
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[15].HeaderText = "Main Type";
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[16].HeaderText = "SMonth";
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[17].HeaderText = "STerm";
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[18].HeaderText = "Concession";
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[19].HeaderText = "School Bill";
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[20].HeaderText = "Hostel Bill";
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[21].HeaderText = "Van Bill";
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[22].HeaderText = "Stationary Bill";
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[1].Width = 120;
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[2].Width = 120;
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[3].Width = 350;
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[4].Width = 120;
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[5].Width = 120;
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[6].Width = 120;
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[7].Width = 120;
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[8].Width = 150;
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[9].Width = 330;
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[10].Width = 120;
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[11].Width = 200;
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[12].Width = 150;
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[13].Width = 330;
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[14].Width = 150;
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[15].Width = 150;
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[16].Width = 150;
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[17].Width = 120;
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[18].Width = 200;
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[19].Width = 200;
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[20].Width = 200;
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[21].Width = 200;
                Student_Outstanding_Arrears_Details_dataGridView1.Columns[22].Width = 200;
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        } 
        
        private void SYear_CBox_KeyDown(object sender, KeyEventArgs e)
        {
            if (SYear_CBox.Text != "")
            {
                if (e.KeyCode == Keys.Enter)
                {
                    Class_CBox.Focus();
                }
            }
            else
            {
                Alert_Msg_Lbl.Visible = true;
                Alert_Msg_Lbl.Text = "Please Fill All the Fields";
            }
        }

        private void Class_CBox_KeyDown(object sender, KeyEventArgs e)
        {
            if (Class_CBox.Text != "")
            {
                if (e.KeyCode == Keys.Enter)
                {
                    Sec_CBox.Focus();
                }
            }
            else
            {
                Alert_Msg_Lbl.Visible = true;
                Alert_Msg_Lbl.Text = "Please Fill All the Fields";
            }
        }

        private void Sec_CBox_KeyDown(object sender, KeyEventArgs e)
        {
            if (Sec_CBox.Text != "")
            {
                if (e.KeyCode == Keys.Enter)
                {
                    Student_Name_CBox.Focus();
                }
            }
            else
            {
                Alert_Msg_Lbl.Visible = true;
                Alert_Msg_Lbl.Text = "Please Fill All the Fields";
            }
        }

        private void Student_Name_CBox_KeyDown(object sender, KeyEventArgs e)
        {
            if (Student_Name_CBox.Text != "")
            {
                if (e.KeyCode == Keys.Enter)
                {
                    View_Btn.Focus();
                }
            }
            else
            {
                Alert_Msg_Lbl.Visible = true;
                Alert_Msg_Lbl.Text = "Please Fill All the Fields";
            }
        }       

        private void Class_CBox_SelectedIndexChanged(object sender, EventArgs e)
        {
            try
            {
                fill_Section_CBox();
                Fill_Std_Name();
                ACFill_Grid();
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }   
        }

        private void Sec_CBox_SelectedIndexChanged(object sender, EventArgs e)
        {
            Fill_Std_Name();
            ACSFill_Grid();
        }

        public void Fill_Std_Name()
        {
            try
            {
                Student_Name_CBox.Items.Clear();
                Student_Name_CBox.Text = "";
                Admis_No_Txt.Text = "";
                query = "select Std_Name from Student_Admission_Master_Table where Class='" + Class_CBox.Text + "' and Section='" + Sec_CBox.Text + "' and SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "'";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    Student_Name_CBox.Items.Add(dr["Std_Name"].ToString());
                }
                con.Close();
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }     

        private void Student_Name_CBox_SelectedIndexChanged(object sender, EventArgs e)
        {
            try
            {
                query = "select Admission_No from Student_Admission_Master_Table where Std_Name='" + Student_Name_CBox.Text + "' and Class='" + Class_CBox.Text + "' and Section='" + Sec_CBox.Text + "' and SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "'";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    Admis_No_Txt.Text = dr["Admission_No"].ToString();
                }
                dr.Close();
                con.Close();
                ALFill_Grid();
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        private void SYear_CBox_SelectedIndexChanged(object sender, EventArgs e)
        {
            try
            {
                query = "select EYear from Academy_Year_Master_Table where SYear='" + SYear_CBox.Text + "'";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    EYear_Txt.Text = dr["EYear"].ToString().Trim();
                }
                con.Close();
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
            Fill_Std_Name();
            AFill_Grid();
        }

        private void Close_Btn_Click(object sender, EventArgs e)
        {
            this.Close();
        }

        private void View_Btn_Click(object sender, EventArgs e)
        {
            try
            {
                if (AYear_CHBox.Checked == true && Class_CHBox.Checked == true && Section_CHBox.Checked == true && Std_Name_CHBox.Checked==true)
                {
                    ALFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == true && Section_CHBox.Checked == true && Std_Name_CHBox.Checked == false )
                {
                    ACSFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == true && Section_CHBox.Checked == false && Std_Name_CHBox.Checked == false)
                {
                    ACFill_Grid();
                    SYear_CBox.Focus();
                }
                else if (AYear_CHBox.Checked == true && Class_CHBox.Checked == false && Section_CHBox.Checked == false && Std_Name_CHBox.Checked == false)
                {
                    AFill_Grid();
                    SYear_CBox.Focus();
                }
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
  
        }

        private void AYear_CHBox_CheckedChanged(object sender, EventArgs e)
        {
            SYear_CBox.Focus();
        }

        private void Class_CHBox_CheckedChanged(object sender, EventArgs e)
        {
            Class_CBox.Focus();
        }

        private void Section_CHBox_CheckedChanged(object sender, EventArgs e)
        {
            Sec_CBox.Focus();
        }

        private void Std_Name_CHBox_CheckedChanged(object sender, EventArgs e)
        {
            Student_Name_CBox.Focus();
        }

        private void Student_Outstanding_Arrears_Details_dataGridView1_CellValueNeeded(object sender, DataGridViewCellValueEventArgs e)
        {
            if (e.RowIndex >= 0 && e.ColumnIndex == 0)
            {
                e.Value = e.RowIndex + 1;
            }
        }   
    }
}
