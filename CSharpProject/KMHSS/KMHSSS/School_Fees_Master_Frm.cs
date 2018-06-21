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
    public partial class School_Fees_Master_Frm : Form
    {
        string query, strsfid;
        int last = 0;
        SqlConnection con = new SqlConnection(@"Data Source=.\SQLEXPRESS;Initial Catalog=DBKMHSS;Integrated Security=True");
        public School_Fees_Master_Frm()
        {
            InitializeComponent();
        }

        private void School_Fees_Master_Frm_Load(object sender, EventArgs e)
        {
            try
            {
                fill_Class_CBox();
                fill_AYear_CBox();
                Alert_Msg_Lbl.Visible = false;
                Auto_Num();
                Fill_Grid();
                Class_CBox.Focus();
                SF_Date_Dtp.Value = DateTime.Now;
                Update_Btn.Enabled = false;
                Delete_Btn.Enabled = false;
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

        public void fill_Term_Type_CBox()
        {
            try
            {
                Term_Type_CBox.Items.Clear();
                query = "select Term_Type from Term_Type_Master_Table where Class='" + Class_CBox.Text + "'";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    Term_Type_CBox.Items.Add(dr["Term_Type"].ToString());
                }
                con.Close();
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void Auto_Num()
        {
            try
            {
                con.Open();
                SqlCommand cmd = new SqlCommand("select SF_Id from School_Fees_Master_Table", con);
                String SF_Id = "SFID";
                SqlDataReader dr = cmd.ExecuteReader();
                if (dr.HasRows)
                {
                    while (dr.Read())
                    {
                        SF_Id = dr[0].ToString();
                        SF_Id = SF_Id.Replace("SFID", "");
                        int no = Convert.ToInt32(SF_Id);
                        no++;
                        SF_Id = "SFID" + no.ToString();
                    }
                }
                else
                {
                    SF_Id = "SFID101";
                }
                SF_Id_Txt.Text = SF_Id;
                dr.Close();
                con.Close();
                Class_CBox.Focus();
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void Fill_Grid()
        {
            try
            {
                query = "select * from School_Fees_Master_Table order by SF_ID desc";          
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                School_Fees_Master_dataGridView1.DataSource = dt;
                School_Fees_Master_dataGridView1.Columns[0].HeaderText = "SF Id";
                School_Fees_Master_dataGridView1.Columns[1].HeaderText = "SF Date";
                School_Fees_Master_dataGridView1.Columns[2].HeaderText = "Class";
                School_Fees_Master_dataGridView1.Columns[3].HeaderText = "SYear";
                School_Fees_Master_dataGridView1.Columns[4].HeaderText = "EYear";
                School_Fees_Master_dataGridView1.Columns[5].HeaderText = "Term Type";
                School_Fees_Master_dataGridView1.Columns[6].HeaderText = "Term Fees";
                School_Fees_Master_dataGridView1.Columns[0].Width = 100;
                School_Fees_Master_dataGridView1.Columns[1].Width = 100;
                School_Fees_Master_dataGridView1.Columns[2].Width = 120;
                School_Fees_Master_dataGridView1.Columns[3].Width = 120;
                School_Fees_Master_dataGridView1.Columns[4].Width = 120;
                School_Fees_Master_dataGridView1.Columns[5].Width = 120;
                School_Fees_Master_dataGridView1.Columns[6].Width = 130;
                Update_Btn.Enabled = false;
                Delete_Btn.Enabled = false;
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void Clear_Controls()
        {
            try
            {
                SF_Id_Txt.Text = "";
                SF_Date_Dtp.Text = "";
                Class_CBox.Text = "";
                SYear_CBox.Text = "";
                EYear_Txt.Text = "";
                Term_Type_CBox.Text = "";
                Term_Fees_Txt.Text = "";
                Auto_Num();
                Class_CBox.Focus();
                Update_Btn.Enabled = false;
                Delete_Btn.Enabled = false;
                Save_Btn.Enabled = true;
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void Add()
        {
            if (SF_Id_Txt.Text != "" && SF_Date_Dtp.Text != "" && Class_CBox.Text != "" && SYear_CBox.Text != "" && EYear_Txt.Text != "" && Term_Type_CBox.Text != "" && Term_Fees_Txt.Text != "")
            {
                try
                {
                    query = "Select * From School_Fees_Master_Table Where Class='" + Class_CBox.Text.ToString().Trim() + "' and SYear='" + SYear_CBox.Text.ToString().Trim() + "' and EYear='" + EYear_Txt.Text.ToString().Trim() + "' and Term_Type='" + Term_Type_CBox.Text.ToString().Trim() + "'";
                    SqlCommand cmd = new SqlCommand(query, con);
                    con.Open();
                    SqlDataReader dr = cmd.ExecuteReader();
                    if (dr.HasRows)
                    {
                        MessageBox.Show("Already Exist");
                    }
                    else
                    {
                        dr.Close();
                        query = "insert into School_Fees_Master_Table values('" + SF_Id_Txt.Text.Trim() + "','" + SF_Date_Dtp.Text.Trim() + "','" + Class_CBox.Text.Trim() + "','" + SYear_CBox.Text.Trim() + "','"+EYear_Txt.Text.Trim() +"','" + Term_Type_CBox.Text.Trim() + "',"+Term_Fees_Txt.Text.Trim() +")";
                        cmd = new SqlCommand(query, con);
                        cmd.ExecuteNonQuery();
                        Alert_Msg_Lbl.Visible = true;
                        Alert_Msg_Lbl.Text = "Inserted Successfully";
                    }
                    con.Close();
                    cmd.Cancel();
                    Fill_Grid();
                    Clear_Controls();
                }
                catch (Exception Ex)
                {
                    MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                }
            }
            else
            {
                Alert_Msg_Lbl.Visible = true;
                Alert_Msg_Lbl.Text = "Please Fill All the Fields";
            }
        }

        public void Updat()
        {
            if (SF_Id_Txt.Text != "" && SF_Date_Dtp.Text != "" && Class_CBox.Text != "" && SYear_CBox.Text != "" && EYear_Txt.Text != "" && Term_Type_CBox.Text != "" && Term_Fees_Txt.Text != "")
            {
                try
                {
                    query = "update School_Fees_Master_Table set Class='" + Class_CBox.Text.Trim() + "',SYear='" + SYear_CBox.Text.Trim() + "',EYear='" + EYear_Txt.Text.Trim() + "',Term_Type='" + Term_Type_CBox.Text + "',Term_Fees=" + Term_Fees_Txt.Text.Trim() + " where SF_Id='" + SF_Id_Txt.Text.Trim() + "'";
                    SqlCommand cmd = new SqlCommand(query, con);
                    con.Open();
                    cmd.ExecuteNonQuery();
                    Alert_Msg_Lbl.Visible = true;
                    Alert_Msg_Lbl.Text = "Updated Successfully";
                    con.Close();
                    Fill_Grid();
                    Clear_Controls();
                }
                catch (Exception Ex)
                {
                    MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                }
            }
            else
            {
                Alert_Msg_Lbl.Visible = true;
                Alert_Msg_Lbl.Text = "Please Fill All the Fields";
            }
        }

        public void Del()
        {
            if (SF_Id_Txt.Text != "" && SF_Date_Dtp.Text != "" && Class_CBox.Text != "" && SYear_CBox.Text != "" && EYear_Txt.Text != "" && Term_Type_CBox.Text != "" && Term_Fees_Txt.Text != "")
            {
                try
                {
                    query = "delete School_Fees_Master_Table where SF_Id='" + SF_Id_Txt.Text + "'";
                    SqlCommand cmd = new SqlCommand(query, con);
                    con.Open();
                    cmd.ExecuteNonQuery();
                    Alert_Msg_Lbl.Visible = true;
                    Alert_Msg_Lbl.Text = "Deleted Successfully";
                    con.Close();
                    Fill_Grid();
                    Clear_Controls();
                }
                catch (Exception Ex)
                {
                    MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                }
            }
            else
            {
                Alert_Msg_Lbl.Visible = true;
                Alert_Msg_Lbl.Text = "Please Fill All the Fields";
            }   
        }

        private void Term_Fees_Txt_KeyDown(object sender, KeyEventArgs e)
        {
            if (e.KeyCode == Keys.Enter)
            {
                try
                {
                    if (Term_Fees_Txt.Text != "")
                    {
                        if (Delete_Btn.Enabled == true)
                        {
                            Updat();
                        }
                        else
                        {
                            Add();
                        }
                        Class_CBox.Focus();
                        Fill_Grid();
                    }
                    else
                    {
                        Alert_Msg_Lbl.Visible = true;
                        Alert_Msg_Lbl.Text = "Please Enter Numbers Only";
                    }
                }
                catch (Exception Ex)
                {
                    MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                }
            }
        }

        private void Class_CBox_KeyDown(object sender, KeyEventArgs e)
        {
            if (Class_CBox.Text != "")
            {
                if (e.KeyCode == Keys.Enter)
                {
                    SYear_CBox.Focus();
                }
            }
            else
            {
                Alert_Msg_Lbl.Visible = true;
                Alert_Msg_Lbl.Text = "Please Fill All the Fields";
            }
        }

        private void Term_Type_CBox_KeyDown(object sender, KeyEventArgs e)
        {
            if (Term_Type_CBox.Text != "")
            {
                if (e.KeyCode == Keys.Enter)
                {
                    Term_Fees_Txt.Focus();
                }
            }
            else
            {
                Alert_Msg_Lbl.Visible = true;
                Alert_Msg_Lbl.Text = "Please Fill All the Fields";
            }
        }

        private void School_Fees_Master_dataGridView1_CellClick(object sender, DataGridViewCellEventArgs e)
        {
            try
            {
                strsfid = School_Fees_Master_dataGridView1.Rows[e.RowIndex].Cells[0].Value.ToString();
                SF_Id_Txt.Text = School_Fees_Master_dataGridView1.Rows[e.RowIndex].Cells[0].Value.ToString();
                SF_Date_Dtp.Text = School_Fees_Master_dataGridView1.Rows[e.RowIndex].Cells[1].Value.ToString();
                Class_CBox.Text = School_Fees_Master_dataGridView1.Rows[e.RowIndex].Cells[2].Value.ToString();
                SYear_CBox.Text = School_Fees_Master_dataGridView1.Rows[e.RowIndex].Cells[3].Value.ToString();
                EYear_Txt.Text = School_Fees_Master_dataGridView1.Rows[e.RowIndex].Cells[4].Value.ToString();
                Term_Type_CBox.Text = School_Fees_Master_dataGridView1.Rows[e.RowIndex].Cells[5].Value.ToString();
                Term_Fees_Txt.Text = School_Fees_Master_dataGridView1.Rows[e.RowIndex].Cells[6].Value.ToString();
                Update_Btn.Enabled = true;
                Delete_Btn.Enabled = true;
                Clear_Btn.Enabled = true;
                Class_CBox.Focus();         
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        private void Class_CBox_SelectedIndexChanged(object sender, EventArgs e)
        {
            fill_AYear_CBox();
            fill_Term_Type_CBox();
        }

        private void SYear_CBox_KeyDown(object sender, KeyEventArgs e)
        {
            if (SYear_CBox.Text != "")
            {
                if (e.KeyCode == Keys.Enter)
                {
                    Term_Type_CBox.Focus();
                }
            }
            else
            {
                Alert_Msg_Lbl.Visible = true;
                Alert_Msg_Lbl.Text = "Please Enter Numbers Only";
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
        }

        private void Save_Btn_Click(object sender, EventArgs e)
        {
            try
            {
                Add();
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        private void Update_Btn_Click(object sender, EventArgs e)
        {
            try
            {
                Updat();
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        private void Delete_Btn_Click(object sender, EventArgs e)
        {
            DialogResult res = MessageBox.Show("Do You Want to Delete", "Delete", MessageBoxButtons.OKCancel, MessageBoxIcon.Information);
            if (res.Equals(DialogResult.OK))
            {
                try
                {
                    Del();
                }
                catch (Exception Ex)
                {
                    MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                }
            }
            else
            {
                MessageBox.Show("Please Check the Details!!!");
            }  
        }

        private void Clear_Btn_Click(object sender, EventArgs e)
        {
            DialogResult res = MessageBox.Show("Do You Want to Clear", "Clear", MessageBoxButtons.OKCancel, MessageBoxIcon.Information);
            if (res.Equals(DialogResult.OK))
            {
                try
                {
                    Clear_Controls();
                    Alert_Msg_Lbl.Text = "";
                    Alert_Msg_Lbl.Visible = false;
                }
                catch (Exception Ex)
                {
                    MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                }
            }
            else
            {
                MessageBox.Show("Please Check the Details!!!");
            }  
        }

        private void Close_Btn_Click(object sender, EventArgs e)
        {
            try
            {
                this.Close();
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        private void Term_Fees_Txt_KeyPress(object sender, KeyPressEventArgs e)
        {
            char ch = e.KeyChar;
            if (!char.IsLetter(ch) && ch != 9 && ch.ToString() != "." && ch.ToString() != "," && ch.ToString() != "-" && ch.ToString() != "+" && ch.ToString() != "/" && ch.ToString() != "*" && ch.ToString() != "=" && ch.ToString() != "&" && ch.ToString() != "!" && ch.ToString() != "@" && ch.ToString() != "#" && ch.ToString() != "$" && ch.ToString() != "%" && ch.ToString() != "^" && ch.ToString() != "(" && ch.ToString() != ")" && ch.ToString() != "_" && ch.ToString() != "?" && ch.ToString() != "<" && ch.ToString() != ">" && ch.ToString() != ";" && ch.ToString() != ":" && ch.ToString() != "[" && ch.ToString() != "]" && ch.ToString() != "{" && ch.ToString() != "}" && ch.ToString() != "|")
            {
                e.Handled = false;
                Alert_Msg_Lbl.Visible = true;
                Alert_Msg_Lbl.Text = "Please Enter Numbers Only";
            }
            else
            {
                e.Handled = true;
            }
        }

        private void SYear_CBox_KeyPress(object sender, KeyPressEventArgs e)
        {
            char ch = e.KeyChar;
            if (!char.IsLetter(ch) && ch != 9 && ch.ToString() != "." && ch.ToString() != "," && ch.ToString() != "-" && ch.ToString() != "+" && ch.ToString() != "/" && ch.ToString() != "*" && ch.ToString() != "=" && ch.ToString() != "&" && ch.ToString() != "!" && ch.ToString() != "@" && ch.ToString() != "#" && ch.ToString() != "$" && ch.ToString() != "%" && ch.ToString() != "^" && ch.ToString() != "(" && ch.ToString() != ")" && ch.ToString() != "_" && ch.ToString() != "?" && ch.ToString() != "<" && ch.ToString() != ">" && ch.ToString() != ";" && ch.ToString() != ":" && ch.ToString() != "[" && ch.ToString() != "]" && ch.ToString() != "{" && ch.ToString() != "}" && ch.ToString() != "|")
            {
                e.Handled = false;
                Alert_Msg_Lbl.Visible = true;
                Alert_Msg_Lbl.Text = "Please Enter Numbers Only";
            }
            else
            {
                e.Handled = true;
            }
        }       
    }
}
